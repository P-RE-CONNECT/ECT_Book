var visible_table = "math_table";

function checkNull(entry) {
    if (entry === null) {
        return "-"
    }
    else {
        return entry
    }
}

function load_glossary(filename, course) {
    fetch(filename)
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById(course).querySelector('tbody');
            tbody.innerHTML = ''; // Clear existing content
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>\\(${checkNull(row.Symbol)}\\)</td><td>${checkNull(row.Use)}</td>`;
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

    function switch_table(new_table) {
        currently_visible = document.getElementById(visible_table);
        currently_visible.style.display = 'none';
        new_visible = document.getElementById(new_table);
        new_visible.style.display = 'table';
        visible_table = new_table;
    }

    switch (selectedValue) {
        case 'mechanics_thermodynamics':
            switch_table("mechanics_thermodynamics");
            break;
        case 'math':
            switch_table("math_table");
            break;
        default:
            switch_table("math_table");
    }
});

function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toLowerCase();
    table = document.getElementById(visible_table)
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
