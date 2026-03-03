import { supabaseAdmin } from '../config/supabaseClient.js';

export async function insertUserCourse(row) {
  return await supabaseAdmin
    .from('user_course')
    .insert([row])
    .select()
    .single();
}

export async function selectUserCoursesByUserId(userId) {
  return await supabaseAdmin
    .from('user_course')
    .select(
      `
      id,
      course_id,
      taken_semester,
      is_taken,
      letter_grade,
      grade_points,
      course_list ( id, course_code, course_name, credit ),
      semester ( id, year, term )
    `
    )
    .eq('user_id', userId)
    .order('taken_semester', { ascending: false });
}

export async function updateUserCourseById(id, userId, patch) {
  return await supabaseAdmin
    .from('user_course')
    .update(patch)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();
}

export async function deleteUserCourseById(id, userId) {
  return await supabaseAdmin
    .from('user_course')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
}
