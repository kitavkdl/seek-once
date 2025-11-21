import { supabase } from '../config/supabaseClient.js';

// Get all majors
export async function getAllMajors() {
  const { data, error } = await supabase.from('major').select('*');

  if (error) {
    console.error('Error fetching majors:', error);
    throw error;
  }

  return data;
}

// Get major by id
export async function getMajorById(id) {
  const { data, error } = await supabase
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
