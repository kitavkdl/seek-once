// majorService.js
const majorDao = require('../dao/majorDao'); // adjust path

async function listMajors() {
  // later: add filters, sorting, etc.
  return majorDao.getAllMajors();
}

async function getMajor(id) {
  // later: throw custom errors, check permissions, etc.
  return majorDao.getMajorById(id);
}

module.exports = {
  listMajors,
  getMajor,
};
