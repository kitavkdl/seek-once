import * as service from '../services/userCourseService.js';

// POST /api/user-courses
export async function create(req, res) {
  try {
    const userId = req.user.id; // must be public.users.id (bigint)
    const { data, error } = await service.createUserCourse(userId, req.body);

    if (error) return res.status(400).json({ error: error.message ?? error });
    return res.status(201).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

// GET /api/user-courses
export async function list(req, res) {
  try {
    const userId = req.user.id;
    const { data, error } = await service.listMyUserCourses(userId);

    if (error) return res.status(400).json({ error: error.message ?? error });
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

// PATCH /api/user-courses/:id
export async function update(req, res) {
  try {
    const userId = req.user.id;
    const id = Number(req.params.id);

    const { data, error } = await service.updateUserCourse(
      userId,
      id,
      req.body
    );

    if (error) return res.status(400).json({ error: error.message ?? error });
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

// DELETE /api/user-courses/:id
export async function remove(req, res) {
  try {
    const userId = req.user.id;
    const id = Number(req.params.id);

    const { error } = await service.deleteUserCourse(userId, id);

    if (error) return res.status(400).json({ error: error.message ?? error });
    return res.json({ message: 'Deleted' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
