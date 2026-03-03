import * as dao from '../daos/userCourseDao.js';

function normalizeLetterGrade(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;

  const v = String(value).trim();
  return v.length ? v : null;
}

function normalizeIsTaken(value) {
  if (value === undefined) return undefined;
  return Boolean(value);
}

// CREATE
export async function createUserCourse(userId, body) {
  const isTaken = normalizeIsTaken(body.is_taken) ?? false;
  const letter = normalizeLetterGrade(body.letter_grade);

  const row = {
    user_id: userId,
    course_id: body.course_id,
    taken_semester: body.taken_semester,
    is_taken: isTaken,
    letter_grade: isTaken ? letter : null,
    grade_points: null, // ignore GPA for now
  };

  if (isTaken && !letter) {
    return {
      data: null,
      error: { message: 'letter_grade required when is_taken is true' },
    };
  }

  return await dao.insertUserCourse(row);
}

// READ
export async function listMyUserCourses(userId) {
  return await dao.selectUserCoursesByUserId(userId);
}

// UPDATE
export async function updateUserCourse(userId, id, body) {
  const patch = {};

  if (body.course_id !== undefined) patch.course_id = body.course_id;
  if (body.taken_semester !== undefined)
    patch.taken_semester = body.taken_semester;

  const isTaken = normalizeIsTaken(body.is_taken);
  const letter = normalizeLetterGrade(body.letter_grade);

  if (isTaken !== undefined) {
    patch.is_taken = isTaken;

    if (!isTaken) {
      patch.letter_grade = null;
      patch.grade_points = null;
      return await dao.updateUserCourseById(id, userId, patch);
    }

    if (!letter) {
      return {
        data: null,
        error: { message: 'letter_grade required when is_taken is true' },
      };
    }

    patch.letter_grade = letter;
    patch.grade_points = null;
    return await dao.updateUserCourseById(id, userId, patch);
  }

  if (letter !== undefined) {
    if (letter === null) {
      patch.letter_grade = null;
      patch.is_taken = false;
      patch.grade_points = null;
    } else {
      patch.letter_grade = letter;
      patch.is_taken = true;
      patch.grade_points = null;
    }
  }

  return await dao.updateUserCourseById(id, userId, patch);
}

// DELETE
export async function deleteUserCourse(userId, id) {
  return await dao.deleteUserCourseById(id, userId);
}
