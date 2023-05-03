const path = require('path');
const { generateId, promptChoices, promptToggle, promptString, promptNumber } = require('./utils/utils');
const { JSONFileManager } = require('./src/jsonFileManager');
const { drawTable } = require('./src/tableDrawer');

let dataFileManager = new JSONFileManager(path.resolve('data/data.json'));
let exit = false;

const listProgram = [
  'Input data stok barang',
  'Lihat semua data stok barang',
  'Hitung total harga semua barang',
  'Perbarui data barang',
  'Hapus data barang',
  'Keluar aplikasi',
];

const inputData = async () => {
  try {
    let namaBarang = await promptString('Nama barang : ', 'Masukkan nama barang');
    let hargaBarang = await promptNumber('Harga barang : ');
    let jumlahBarang = await promptNumber('Jumlah barang : ');
    if (namaBarang == undefined || hargaBarang == undefined || jumlahBarang == undefined) {
      throw new Error('Gagal menyimpan data barang. Pastikan seluruh data telah terisi!.');
    }
    let newData = { id: generateId(), namaBarang, hargaBarang, jumlahBarang };
    await dataFileManager.addData(newData);
    console.log('Data barang berhasil ditambahkan!.');
  } catch (error) {
    console.error(error);
  }
};

const readAllData = async () => {
  try {
    const data = (await dataFileManager.readData()) || [];
    if (data.length == 0) {
      console.log('Belum ada data yang tersimpan!.');
      return;
    }
    console.log('\n Berikut data semua stok barang :');
    drawTable(data);
  } catch (error) {
    console.error(error);
  }
};

const sumAllProductPrice = async () => {
  try {
    const data = (await dataFileManager.readData()) || [];
    if (data.length == 0) {
      console.log('Belum ada data yang tersimpan!.');
      return;
    }
    console.log('\n Berikut total harga semua barang :');
    drawTable(data, true);
  } catch (error) {
    console.error(error);
  }
};

const updateData = async () => {
  try {
    const data = (await dataFileManager.readData()) || [];
    if (data.length == 0) {
      console.log('Belum ada data yang tersimpan!.');
      return;
    }
    let dataChoices = data.map((datum) => {
      return `${datum.id} | ${datum.namaBarang}`;
    });
    let choosedData = await promptChoices('Pilih data barang yang ingin diupdate :', dataChoices);
    choosedData = choosedData.split(' | ');
    choosedData = data.find((datum) => datum.id === choosedData[0]);
    console.log(`Berikan data baru untuk barang dengan ID ${choosedData.id}`);
    let namaBarang = await promptString('Nama barang : ', choosedData.namaBarang);
    let hargaBarang = await promptNumber('Harga barang : ', choosedData.hargaBarang);
    let jumlahBarang = await promptNumber('Jumlah barang : ', choosedData.jumlahBarang);
    if (namaBarang == undefined || hargaBarang == undefined || jumlahBarang == undefined) {
      throw new Error('Gagal memperbarui data barang. Pastikan seluruh data telah terisi!.');
    }
    let updatedData = { id: choosedData.id, namaBarang, hargaBarang, jumlahBarang };
    await dataFileManager.updateData(updatedData);
    console.log('Data barang berhasil diupdate!.');
  } catch (error) {
    console.error(error);
  }
};

const deleteData = async () => {
  try {
    const data = (await dataFileManager.readData()) || [];
    if (data.length == 0) {
      console.log('Belum ada data yang tersimpan!.');
      return;
    }
    let dataChoices = data.map((datum) => {
      return `${datum.id} | ${datum.namaBarang}`;
    });
    let choosedData = await promptChoices('Pilih data barang yang ingin dihapus :', dataChoices);
    choosedData = choosedData.split(' | ');
    choosedData = data.find((datum) => datum.id === choosedData[0]);
    const confirmDelete = await promptToggle(
      `Apakah anda yakin ingin menghapus data barang bernama ${choosedData.namaBarang} dengan id ${choosedData.id}?`
    );
    if (confirmDelete) {
      await dataFileManager.deleteData(choosedData.id);
      console.log('Data barang berhasil dihapus.');
    } else {
      console.log('Data barang tidak jadi dihapus.');
    }
  } catch (error) {
    console.error(error);
  }
};

const askExit = async () => {
  let isExit = await promptToggle('Apakah anda ingin menutup aplikasi ini?');
  exit = isExit;
  if (exit) {
    console.log('Terima kasih telah mencoba program ini. Semoga harimu menyenangkan :))');
    console.log('Made with ❤️  by Dimas Maulana');
  }
};

const startApp = async () => {
  while (!exit) {
    console.clear();
    let choosedProgram = '';
    choosedProgram = await promptChoices('Pilih program yang akan dijalankan :', (choices = [...listProgram]));
    switch (choosedProgram) {
      case listProgram[0]:
        await inputData();
        break;
      case listProgram[1]:
        await readAllData();
        break;
      case listProgram[2]:
        await sumAllProductPrice();
        break;
      case listProgram[3]:
        await updateData();
        break;
      case listProgram[4]:
        await deleteData();
        break;
      case listProgram[5]:
        console.clear();
        await askExit();
        break;

      default:
        break;
    }
    if (choosedProgram !== listProgram[5]) {
      await askExit();
    }
  }
};

startApp();
