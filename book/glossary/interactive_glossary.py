import pandas as pd
from ipywidgets import widgets, interact
from IPython.display import display, HTML
import numpy as np

class Interactive_Glossary:
    def __init__(self, glossary_file):
        """
        Initialize the Interactive_Glossary class.\n
        `glossary_file`: str, path to the Excel file containing the glossary.
        """
        
        self.glossary_file = glossary_file
        self.glossary_greek = None

        # Load the Excel file
        xls = pd.ExcelFile(glossary_file, engine='openpyxl')

        # Iterate through the sheet names
        for sheet_name in xls.sheet_names:
            if 'Greek' in sheet_name:
                self.glossary_greek = pd.read_excel(xls, sheet_name=sheet_name, skiprows=2, index_col=[0,1])
            elif 'Math' in sheet_name:
                self.glossary_math = pd.read_excel(xls, sheet_name=sheet_name, skiprows=0, index_col=[0,1])
            elif 'Latin' in sheet_name:
                self.glossary_latin = pd.read_excel(xls, sheet_name=sheet_name, skiprows=2, index_col=0)
            else:
                raise ValueError(f"Unknown sheet name: {sheet_name}, must be Greek, Math, or Latin")

    def SheetSelection(self, sheet='Greek'):
        """
        Select the appropriate sheet based on the input.\n
        `sheet`: str, name of the sheet to select ('Greek', 'Math', or 'Latin').
        """
        
        if sheet == 'Greek':
            return self.glossary_greek
        elif sheet == 'Math':
            return self.glossary_math
        elif sheet == 'Latin':
            return self.glossary_latin
        
    def display_df(self, sheet='Greek'):
        display(self.df_align(self.SheetSelection(sheet)))
        
    def df_align(self, df):
        """
        Align the DataFrame for better display.\n
        `df`: DataFrame, the DataFrame to align.
        """
         
        left_aligned_df = df.style.set_properties(**{'text-align': 'left'})
        
        left_aligned_df = left_aligned_df.set_table_styles(
            [dict(selector='th', props=[('text-align', 'left')])])
        return left_aligned_df
    
    def OneCoursePlotly(self, sheet='Greek'):
        """
        Create an interactive glossary for a single course with a dropdown menu.\n
        `sheet`: str, name of the sheet to select ('Greek', 'Math', or 'Latin').
        """
        
        # Display styling
        display(HTML(f"<h3>📚 Interactive Glossary of {sheet} Symbols</h3>"))
        display(HTML("<p>Select a course to filter the symbols and their meanings:</p>"))

        df = self.SheetSelection(sheet)
        df.style.set_properties(**{'text-align': 'left'})
        # Create a dropdown for course selection
        courses = df.columns
        dropdown = widgets.Dropdown(
            options=['All'] + list(courses),
            value='All',
            description='Course:',
        )

        # Function to filter the DataFrame based on the dropdown selection
        def filter_glossary(course):
            display(HTML("<h4>Filtered Glossary:</h4>"))
            if course == 'All':
                display(self.df_align(df.fillna('')))
            else:
                filtered_df = pd.DataFrame(df[course].dropna())
                display(self.df_align(filtered_df))

        # Link the dropdown to the filtering function
        interact(filter_glossary, course=dropdown);
    
    def _combine_and_dedup(self, row, courses):
        seen = set()
        result = []
        for col in courses:
            val = row[col]
            if pd.isnull(val):
                continue
            for entry in str(val).split(','):
                entry_stripped = entry.strip()
                entry_norm = entry_stripped.lower()
                if entry_norm and entry_norm not in seen:
                    seen.add(entry_norm)
                    result.append(entry_stripped)
        # Alphabetically sort, but preserve original casing (sort using lowercased version)
        result = sorted(result, key=lambda x: x.lower())
        # Capitalize only the first entry
        if result:
            result[0] = result[0].capitalize()
            for i in range(1, len(result)):
                result[i] = result[i].lower()
        return ', '.join(result)
    
    def MultiCoursePlotly(self, sheet='Greek', option_all_separate=True, option_search=True, option_all_combined=False):
        df = self.SheetSelection(sheet)
        df = df.copy()  # Prevent side effects

        # Display styling
        display(HTML(f"<h3>📚 Interactive Glossary of {sheet} Symbols</h3>"))
        display(HTML("<p>Select one or more courses to filter the symbols and their meanings:</p>"))
        
        # Add 'All combined' column if needed
        if option_all_combined:
            if 'All combined' not in df.columns:
                courses = list(df.columns)
                df['All combined'] = df.apply(lambda row: self._combine_and_dedup(row, courses), axis=1)
            courses = [c for c in df.columns if c != 'All combined']  # Exclude duplicate
        else:
            courses = list(df.columns)

        # Set options for select (order: All combined, All separate, then courses)
        options = []
        default_value = []
        if option_all_combined:
            options.append("All combined")
            default_value.append("All combined")
        if option_all_separate:
            options.append("All separate")
            if not default_value:
                default_value.append("All separate")
        options += courses
        if not default_value:
            default_value = [courses[0]]

        height = min(250, 20 * (len(options)) + 10)
        multi_select = widgets.SelectMultiple(
            options=options,
            value=default_value,
            description='Courses:',
            layout={'width': '30%', 'height': f'{height}px'},
        )
        
        # Create a search bar if option_search is enabled
        if option_search:
            search_input = widgets.Text(
                value='',
                placeholder='Search symbol or description...',
                description='Search:',
                layout={'width': '30%'}
            )

            def filter_glossary(selected_courses, search_query=""):
                display(HTML("<h4>Filtered Glossary:</h4>"))
                if not selected_courses:
                    display(HTML("<p>No courses selected.</p>"))
                    return
                # Handle "All separate"
                if "All separate" in selected_courses and option_all_separate:
                    # Show only the original course columns (exclude 'All combined')
                    course_columns = [c for c in df.columns if c != "All combined"]
                    result_df = df[course_columns].dropna(how='all').fillna('')
                elif "All combined" in selected_courses and option_all_combined:
                    result_df = pd.DataFrame(df['All combined'])
                    result_df = result_df[result_df['All combined'].str.strip() != '']
                else:
                    courses_sel = [str(c) for c in selected_courses]
                    result_df = df[courses_sel].dropna(how='all').fillna('')

                if search_query:
                    result_df = result_df[result_df.apply(lambda row: row.astype(str).str.contains(search_query, case=False).any(), axis=1)]

                display(self.df_align(result_df))

            interact(filter_glossary, selected_courses=multi_select, search_query=search_input)

        else:
            def filter_glossary_no_search(selected_courses):
                display(HTML("<h4>Filtered Glossary:</h4>"))
                if not selected_courses:
                    display(HTML("<p>No courses selected.</p>"))
                    return
                if "All separate" in selected_courses and option_all_separate:
                    # Show only the original course columns (exclude 'All combined')
                    course_columns = [c for c in df.columns if c != "All combined"]
                    result_df = df[course_columns].dropna(how='all').fillna('')
                elif "All combined" in selected_courses and option_all_combined:
                    result_df = pd.DataFrame(df['All combined'])
                    result_df = result_df[result_df['All combined'].str.strip() != '']
                else:
                    courses_sel = [str(c) for c in selected_courses]
                    result_df = df[courses_sel].dropna(how='all').fillna('')

                display(self.df_align(result_df))

            interact(filter_glossary_no_search, selected_courses=multi_select)
    

    def MathOperatorsPlotly(self, option_search=True):
        """
        Create an interactive glossary for a single course with a dropdown menu.\n
        `sheet`: str, name of the sheet to select ('Greek', 'Math', or 'Latin').
        """
        
        # Display styling
        display(HTML(f"<h3>📚 Interactive Glossary of Math Operators</h3>"))
        display(HTML("<p>Select one or more courses to filter the operators and their meanings:</p>"))

        df = self.SheetSelection('Math')
        
        # Create a search bar if option_search is enabled
        if option_search:
            search_input = widgets.Text(
                value='',
                placeholder='Search symbol or description...',
                description='Search:',
                layout={'width': '30%'}
            )
            
            def filter_glossary(search_query=""):
                display(HTML("<h4>Filtered Glossary:</h4>"))
                
                if search_query:
                    # Apply search filter if option_search is enabled
                    result_df = df[df.apply(lambda row: row.astype(str).str.contains(search_query, case=False).any(), axis=1)]
                else:
                    result_df = df.fillna('')
                
                # Display the result
                display(self.df_align(result_df))

            interact(filter_glossary, search_query=search_input)
        else:
            def filter_glossary():
                display(HTML("<h4>Filtered Glossary:</h4>"))
                
                result_df = df.fillna('')
                
                # Display the result
                display(self.df_align(result_df))

            interact(filter_glossary)