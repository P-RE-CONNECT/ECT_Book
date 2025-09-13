function load_glossary(filename, course) {
    fetch(filename)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById(course).querySelector('tbody');
            tbody.innerHTML = ''; // Clear existing content
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>\\(${row.Symbol}\\)</td><td>${row.Name}</td><td>${row.Use}</td>`;
                tbody.appendChild(tr);
            });

            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        })
        .catch(error => console.error('Error fetching glossary data:', error));
    }

    load_glossary('glossary_math.json', 'math_table');
    load_glossary('glossary_mechanics_thermodynamics.json', 'mechanics_thermodynamics');

    document.getElementById('glossary-select').addEventListener('change', function() {
        var selectedValue = this.value;

        var math_table = document.getElementById('math_table');
        var mechanics_thermodynamics = document.getElementById('mechanics_thermodynamics');

        switch (selectedValue) {
            case 'glossary/1':
                mechanics_thermodynamics.style.display = 'table';
                math_table.style.display = 'none';
                break;
            case 'math':
                math_table.style.display = 'table';
                mechanics_thermodynamics.style.display = 'none';
                break;
            default:
                mechanics_thermodynamics.style.display = 'none';
                math_table.style.display = 'none';
        }
    });
