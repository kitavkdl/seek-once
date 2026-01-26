// server/daos/userDao.js
import { supabaseAdmin } from '../config/supabaseClient.js';

// READ: all users (optional filtering by school/major/minor)
export async function getAllUsers({ school_id, major_id, minor_id } = {}) {
  let query = supabaseAdmin.from('users').select('*'); // ✅ users (not user)

  if (school_id) query = query.eq('school_id', school_id);
  if (major_id) query = query.eq('major_id', major_id);
  if (minor_id) query = query.eq('minor_id', minor_id);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }

  return data;
}

// READ: one user by bigint id
export async function getUserById(id) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user by id:', error.message);
    throw error;
  }

  return data;
}

// READ: one user by auth_user_id (uuid) ✅ needed for /me
export async function getUserByAuthUserId(authUserId) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single();

  if (error) {
    console.error('Error fetching user by auth_user_id:', error.message);
    throw error;
  }

  return data;
}

// CREATE: user profile (usually done by signup)
export async function createUser({
  auth_user_id,
  school_id,
  major_id,
  minor_id,
  cum_gpa,
  enrolled_semester,
  first_name,
  last_name,
  role,
}) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert([
      {
        auth_user_id,
        school_id,
        major_id,
        minor_id: minor_id ?? null,
        cum_gpa: cum_gpa ?? null,
        enrolled_semester,
        first_name: first_name ?? null,
        last_name: last_name ?? null,
        role: role ?? 'student',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }

  return data;
}

// UPDATE: user profile by bigint id
export async function updateUser(id, payload) {
  // Safety: prevent changing ownership/role through generic update
  delete payload.auth_user_id;
  delete payload.role;

  const { data, error } = await supabaseAdmin
    .from('users')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }

  return data;
}

// DELETE: user by bigint id (does NOT delete auth user)
export async function deleteUser(id) {
  const { error } = await supabaseAdmin.from('users').delete().eq('id', id);

  if (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }

  return true;
}
