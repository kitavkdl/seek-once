// majorService.js
const majorDao = require('../daos/majorDao'); // adjust path

async function listMajors() {
  // later: add filters, sorting, etc.
  return majorDao.getAllMajors();
}

async function getMajor(id) {
  // later: throw custom errors, check permissions, etc.
  return majorDao.getMajorById(id);
}

export async function createMajor(payload) {
  // you could validate required fields here
  return majorDao.createMajor(payload);
}

module.exports = {
  listMajors,
  getMajor,
  createMajor,
};
