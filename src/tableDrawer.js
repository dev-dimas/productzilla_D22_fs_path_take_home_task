const { table } = require('table');

const drawTable = (data = [], withPriceSum = false) => {
  let config = {
    columns: [{ alignment: 'center' }, { alignment: 'left' }, { alignment: 'center' }, { alignment: 'center' }],
    spanningCells: [{ col: 1, row: 0, colSpan: 1, alignment: 'center' }],
  };

  let headTable = ['ID', 'Nama Barang', 'Harga', 'Kuantitas'];
  const dataTable = [];
  let row = [];

  data.forEach((datum) => {
    if (withPriceSum) {
      row.push([datum.id, datum.namaBarang, datum.hargaBarang, datum.jumlahBarang, datum.hargaBarang * datum.jumlahBarang]);
    } else {
      row.push([datum.id, datum.namaBarang, datum.hargaBarang, datum.jumlahBarang]);
    }
  });

  if (withPriceSum) {
    headTable.push('Sub-Total');
    const total = data.reduce((total, item) => {
      return total + item.hargaBarang * item.jumlahBarang;
    }, 0);
    let space = ['', '', '', '', ''];
    let footerTable = ['', '', '', 'Total', total];
    dataTable.push(headTable, ...row, space, footerTable);
  } else {
    dataTable.push(headTable, ...row);
  }

  console.log(table(dataTable, config));
};

module.exports = { drawTable };
