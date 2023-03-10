const gridData = [
  [null, 'Red', 'Blue', 'Green', 'Orange', 'Purple'],
  ['Red', null, null, null, null, null],
  ['Blue', null, null, null, null, null],
  ['Green', null, null, null, null, null],
  ['Orange', null, null, null, null, null],
  ['Purple', null, null, null, null, null],
];

// create the weights grid element
const weightsGrid = document.createElement('div');
weightsGrid.id = 'weights-grid';
weightsGrid.classList.add('weights-grid-container');

// Add column labels
const columnLabels = document.createElement('div');
columnLabels.classList.add('weights-grid-row');
columnLabels.classList.add('weights-grid-column-label');
for (let i = 0; i < gridData[0].length; i++) {
  const cell = document.createElement('div');
  cell.classList.add('weights-grid-cell');
  cell.innerText = gridData[0][i];
  columnLabels.appendChild(cell);
}
weightsGrid.appendChild(columnLabels);

// Add row labels and cells
for (let i = 1; i < gridData.length; i++) {
  const row = document.createElement('div');
  row.classList.add('weights-grid-row');

  // Add row label
  const rowLabel = document.createElement('div');
  rowLabel.classList.add('weights-grid-row-label');
  rowLabel.classList.add(gridData[i][0].toLowerCase());
  rowLabel.innerText = gridData[i][0];
  row.appendChild(rowLabel);

  // Add cells
  for (let j = 1; j < gridData[i].length; j++) {
    const cell = document.createElement('div');
    cell.classList.add('weights-grid-cell');
    cell.classList.add(gridData[0][j].toLowerCase());
    row.appendChild(cell);
  }

  weightsGrid.appendChild(row);
}

// append the weights grid element to the parent element
const gridContainer = document.querySelector('.dashboard-content');
gridContainer.appendChild(weightsGrid);
