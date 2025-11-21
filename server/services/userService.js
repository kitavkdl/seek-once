// server/services/userService.js
import * as userDao from '../daos/userDao.js';

export async function listUsers(filters) {
  return userDao.getAllUsers(filters);
}

export async function getUser(id) {
  return userDao.getUserById(id);
}

export async function createUser(payload) {
  // add validation / defaults here if needed
  return userDao.createUser(payload);
}

export async function updateUser(id, payload) {
  return userDao.updateUser(id, payload);
}

export async function removeUser(id) {
  return userDao.deleteUser(id);
}
