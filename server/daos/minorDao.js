import { supabaseAdmin } from '../config/supabaseClient.js';

// Get all majors
export async function getAllMinors() {
  const { data, error } = await supabaseAdmin.from('minor').select('*');

  if (error) {
    console.error('Error fetching minor:', error);
    throw error;
  }

  return data;
}

// Get minor by id
export async function getMajorById(id) {
  const { data, error } = await supabaseAdmin

    .from('minor')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching minor by ID:', error);
    throw error;
  }

  return data;
}
