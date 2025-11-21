import { supabase } from '../config/supabaseClient.js';

// READ: all users (optional filtering by school/major/minor)
export async function getAllUsers({ school, major_id, minor_id } = {}) {
  let query = supabase.from('user').select('*');

  if (school) query = query.eq('school', school);
  if (major_id) query = query.eq('major_id', major_id);
  if (minor_id) query = query.eq('minor_id', minor_id);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

  return data;
}

// READ: one user by id
export async function getUserById(id) {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }

  return data;
}

// CREATE: user profile
export async function createUser({
  school,
  major_id,
  minor_id,
  cum_gpa,
  enrolled_semester,
}) {
  const { data, error } = await supabase
    .from('user')
    .insert([
      {
        school,
        major_id,
        minor_id,
        cum_gpa,
        enrolled_semester,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return data;
}

// UPDATE: user profile
export async function updateUser(id, payload) {
  const { data, error } = await supabase
    .from('user')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    throw error;
  }

  return data;
}

// DELETE: user
export async function deleteUser(id) {
  const { error } = await supabase.from('user').delete().eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    throw error;
  }

  return true;
}
