// Fetch CSV file from same directory
    fetch('Table_Input.csv')
      .then(response => response.text())
      .then(csvText => {
        const rows = csvText.trim().split('\n').map(row => row.split(','));

        // Display Table 1
        let table1HTML = '<table><thead><tr><th>Index #</th><th>Value</th></tr></thead><tbody>';
        rows.forEach((row, index) => {
          if(index === 0 && row[0].toLowerCase().includes('index')) return; // skip header
          table1HTML += `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`;
        });
        table1HTML += '</tbody></table>';
        document.getElementById('table1').innerHTML = table1HTML;

        // Helper to get numeric value by index
        const getValue = code => {
          for(const row of rows) {
            if(row[0] === code) return parseFloat(row[1]);
          }
          return 0;
        };

        // Calculate values using formulas
        const alpha = getValue('A5') + getValue('A20');
        const beta = getValue('A15') / getValue('A7');
        const charlie = getValue('A13') * getValue('A12');

        // Display Table 2 with formula hover/click effect
        let table2HTML = '<table><thead><tr><th>Category</th><th>Value</th></tr></thead><tbody>';

        table2HTML += `<tr>
          <td>Alpha</td>
          <td>
            <span class="formula" style="display:none;">A5 + A20</span>
            <span class="value">${alpha}</span>
          </td>
        </tr>`;

        table2HTML += `<tr>
          <td>Beta</td>
          <td>
            <span class="formula" style="display:none;">A15 / A7</span>
            <span class="value">${beta}</span>
          </td>
        </tr>`;

        table2HTML += `<tr>
          <td>Charlie</td>
          <td>
            <span class="formula" style="display:none;">A13 * A12</span>
            <span class="value">${charlie}</span>
          </td>
        </tr>`;

        table2HTML += '</tbody></table>';
        document.getElementById('table2').innerHTML = table2HTML;

        // Add click event for mobile toggle of formula
document.getElementById('table2').addEventListener('click', (event) => {
  let tr = event.target;
  while (tr && tr.tagName !== 'TR') {
    tr = tr.parentElement;
  }
  if (!tr) return;
  tr.classList.toggle('show-formula');
});

      })
      .catch(err => {
        document.getElementById('table1').innerHTML = '<p style="color:red;">Failed to load CSV file.</p>';
        document.getElementById('table2').innerHTML = '';
        console.error('Error loading CSV:', err);
      });
