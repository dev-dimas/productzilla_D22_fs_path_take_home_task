const { Select, Toggle, NumberPrompt, Input } = require('enquirer');

/**
 * Membuat ID berdasarkan UNIX epoch.
 * @returns {string} - ID yang dihasilkan dari total milisecond UNIX epoch.
 */
const generateId = () => {
  return new Date().getTime().toString();
};

/**
 * Membuat prompt dengan pilihan beberapa jawaban.
 * @param {string} message - Pesan / pertanyaan yang akan ditampilkan
 * @param {Array.<string>} choices - Pilihan jawaban yang diberikan
 * @returns {Promise<string>} Jawaban yang dipilih.
 */
const promptChoices = async (message, choices) => {
  try {
    let respond = await new Select({
      message,
      choices,
    }).run();
    return respond;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Membuat prompt dengan 2 pilihan jawaban.
 * @param {string} message - Pesan / pertanyaan yang akan ditampilkan
 * @returns {Promise<boolean>} Jawaban yang dipilih.
 */
const promptToggle = async (message) => {
  try {
    let respond = await new Toggle({
      message,
      enabled: 'Iya',
      disabled: 'Tidak',
    }).run();
    return respond;
  } catch (error) {}
};

/**
 * Membuat prompt yang hanya dapat menerima inputan berupa Number.
 * @param {string} message - Pesan / pertanyaan yang akan ditampilkan
 * @param {number} placeholder - Angka ditampilkan ketika input masih kosong
 * @returns {Promise<number>} Angka yang diinputkan.
 */
const promptNumber = async (message, placeholder = undefined) => {
  try {
    let respond = await new NumberPrompt({ message, initial: placeholder }).run();
    return respond;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Membuat prompt yang menerima inputan sebagai String.
 * @param {string} message - Pesan / pertanyaan yang akan ditampilkan
 * @param {string} placeholder - Pesan yang ditampilkan ketika input masih kosong
 * @returns {Promise<string>} String yang diinputkan.
 */
const promptString = async (message, placeholder = '') => {
  try {
    let respond = await new Input({ message, initial: placeholder }).run();
    return respond;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  generateId,
  promptChoices,
  promptToggle,
  promptNumber,
  promptString,
};
