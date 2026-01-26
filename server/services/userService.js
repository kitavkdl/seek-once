// server/services/userService.js
import * as userDao from '../daos/userDao.js';

export async function listUsers(filters) {
  return userDao.getAllUsers(filters);
}

export async function getUser(id) {
  return userDao.getUserById(id);
}

export async function getUserByAuthUserId(authUserId) {
  return userDao.getUserByAuthUserId(authUserId);
}

export async function createUser(payload) {
  return userDao.createUser(payload);
}

export async function updateUser(id, payload) {
  return userDao.updateUser(id, payload);
}

/**
 * Update the logged-in user's row using auth_user_id:
 * - find their row
 * - update only allowed fields
 */
export async function updateMe(authUserId, payload) {
  const me = await userDao.getUserByAuthUserId(authUserId);
  if (!me) return null;

  // Allow only safe fields for self-update
  const allowed = {};
  if ('first_name' in payload) allowed.first_name = payload.first_name;
  if ('last_name' in payload) allowed.last_name = payload.last_name;
  if ('minor_id' in payload) allowed.minor_id = payload.minor_id;
  if ('cum_gpa' in payload) allowed.cum_gpa = payload.cum_gpa;

  // Do NOT allow: role, auth_user_id, school_id, major_id, enrolled_semester, id
  return userDao.updateUser(me.id, allowed);
}

/**
 * Admin check based on public.users.role
 */
export async function isAdmin(authUserId) {
  const me = await userDao.getUserByAuthUserId(authUserId);
  return me?.role === 'admin';
}

export async function removeUser(id) {
  return userDao.deleteUser(id);
}
