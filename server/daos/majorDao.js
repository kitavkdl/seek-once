import { supabaseAdmin } from '../config/supabaseClient.js';

// Get all majors
export async function getAllMajors() {
  const { data, error } = await supabaseAdmin.from('major').select('*');

  if (error) {
    console.error('Error fetching majors:', error);
    throw error;
  }

  return data;
}

// Get major by id
export async function getMajorById(id) {
  const { data, error } = await supabaseAdmin
    .from('major')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching major by ID:', error);
    throw error;
  }

  return data;
}

// CREATE
export async function createMajor({ dept, major_name, specialization }) {
  const { data, error } = await supabaseAdmin
    .from('major')
    .insert([{ dept, major_name, specialization }])
    .select()
    .single();

  if (error) {
    console.error('Error creating major:', error);
    throw error;
  }

  return data;
}
