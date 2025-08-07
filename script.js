//fetch the csv file from the same directory
fetch('Table_Input.csv')
.then(response => response.text()) //read csv as plain text
.then(csvText => {
    //parse csv: split into rows, then split into each rows by commas
    const rows = csvText.trim().split('\n').map(row => row.split(','));

    //display table 1
    let table1HTML = '<table border="1" cellpadding="5" cellspacing="0"><tr><th>Index #</th><th>Value</th></tr>';
    rows.forEach((row, index) => {
        //skip header row 
        if(index === 0 && row[0].toLowerCase().includes('index')) return;
        table1HTML += `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`;
    });
    table1HTML += '</table>'
    document.getElementById('table1').innerHTML = table1HTML;

    //helper to get numeric value by index
    const getValue = code => {
      for(const row of rows) {
        if(row[0] === code) return parseFloat(row[1]);
      }
      return 0; // default if not found
    };
    // Calculate values using the formulas
    const alpha = getValue('A5') + getValue('A20');
    const beta = getValue('A15') / getValue('A7');
    const charlie = getValue('A13') * getValue('A12');

     // Display Table 2 with formula hover effect
let table2HTML = '<table id="table2" border="1" cellpadding="5" cellspacing="0"><tr><th>Category</th><th>Value</th></tr>';

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

table2HTML += '</table>';
document.getElementById('table2').innerHTML = table2HTML;

});