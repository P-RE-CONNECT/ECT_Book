import pandas as pd
from ipywidgets import widgets, interact
from IPython.display import display, HTML

class Interactive_Glossary:
    def __init__(self, glossary_file):
        """
        Initialize the Interactive_Glossary class.\n
        `glossary_file`: str, path to the Excel file containing the glossary.
        """
        
        self.glossary_file = glossary_file
        self.glossary_greek = None

        # Load the Excel file
        xls = pd.ExcelFile(glossary_file)

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
        display(HTML("<p>Select one or more courses to filter the symbols and their meanings:</p>"))

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
        

    def MultiCoursePlotly(self, sheet='Greek', option_all=True, option_search=True):
        """
        Create an interactive glossary for multiple courses with a multi-select widget.\n
        `sheet`: str, name of the sheet to select ('Greek', 'Math', or 'Latin').\n
        `option_all`: bool, whether to include an "All" option in the multi-select.\n
        `option_search`: bool, whether to include a search bar for filtering.
        """
                
        df = self.SheetSelection(sheet)
        df.style.set_properties(**{'text-align': 'left'})
        # Display styling
        display(HTML(f"<h3>📚 Interactive Glossary of {sheet} Symbols</h3>"))
        display(HTML("<p>Select one or more courses to filter the symbols and their meanings:</p>"))
        
        # Create a multi-select widget for course selection
        courses = list(df.columns)
        total_courses = len(courses) + (1 if option_all else 0)
        height = min(250, 20 * total_courses + 10)
        multi_select = widgets.SelectMultiple(
            options=["All"] + courses if option_all else courses,
            value=["All"] if option_all else [courses[0]],
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
            
            # Function to filter the DataFrame based on the dropdown selection and search
            def filter_glossary(selected_courses, search_query=""):
                display(HTML("<h4>Filtered Glossary:</h4>"))
                
                if not selected_courses:
                    display(HTML("<p>No courses selected.</p>"))
                    return
                
                # Handle "All" selection
                if "All" in selected_courses and option_all:
                    result_df = df.dropna(how='all').fillna('')
                else:
                    # Collect all symbols and descriptions from the selected courses
                    courses = [str(course) for course in selected_courses]
                    result_df = df[courses].dropna(how='all').fillna('')
                
                # Apply search filter if option_search is enabled
                if search_query:
                    result_df = result_df[result_df.apply(lambda row: row.astype(str).str.contains(search_query, case=False).any(), axis=1)]

                # Display the result
                display(self.df_align(result_df))
                
            # Link the multi-select and search to the filtering function
            interact(filter_glossary, selected_courses=multi_select, search_query=search_input)

        else:
            # Function without search_query if option_search is False
            def filter_glossary_no_search(selected_courses):
                display(HTML("<h4>Filtered Glossary:</h4>"))
                
                if not selected_courses:
                    display(HTML("<p>No courses selected.</p>"))
                    return
                
                # Handle "All" selection
                if "All" in selected_courses and option_all:
                    result_df = df.dropna(how='all').fillna('')
                else:
                    # Collect all symbols and descriptions from the selected courses
                    courses = [str(course) for course in selected_courses]
                    result_df = df[courses].dropna(how='all').fillna('')

                # Display the result
                display(self.df_align(result_df))

            # Link the multi-select without search
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