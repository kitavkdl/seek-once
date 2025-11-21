// minorService.js
const minorDao = require('../daos/minorDao'); // adjust path

export async function listMinors() {
  // later: add filters, sorting, etc.
  return minorDao.getAllMinors();
}

export async function getMinor(id) {
  // later: throw custom errors, check permissions, etc.
  return minorDao.getMinorById(id);
}

export async function createMinor(payload) {
  // you could validate required fields here
  return minorDao.createMinor(payload);
}
