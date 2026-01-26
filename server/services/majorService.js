// server/services/majorService.js
import * as majorDao from '../daos/majorDao.js';

export async function listMajors(filters) {
  return majorDao.getAllMajors(filters);
}

export async function getMajor(id) {
  return majorDao.getMajorById(id);
}

export async function createMajor(payload) {
  return majorDao.createMajor(payload);
}

export async function updateMajor(id, payload) {
  return majorDao.updateMajor(id, payload);
}

export async function removeMajor(id) {
  return majorDao.deleteMajor(id);
}
