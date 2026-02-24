// server/controllers/authController.js
import { supabaseAdmin, supabasePublic } from '../config/supabaseClient.js';

/**
 * POST /api/auth/signup
 * body: {
 *  email, password,
 *  school_id, major_id, minor_id?, enrolled_semester,
 *  first_name?, last_name?
 * }
 */
export async function signUp(req, res) {
  try {
    const {
      email,
      password,
      school_id,
      major_id,
      minor_id,
      enrolled_semester,
      first_name,
      last_name,
    } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }
    if (!school_id || !major_id || !enrolled_semester) {
      return res
        .status(400)
        .json({ error: 'school_id, major_id, enrolled_semester required' });
    }

    // 1) Create Auth user (Admin API - requires SERVICE ROLE key)
    const { data: created, error: createErr } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // you can change to false if you want email verification flow
      });

    if (createErr) return res.status(400).json({ error: createErr.message });

    const authUserId = created?.user?.id;
    if (!authUserId) {
      return res
        .status(500)
        .json({ error: 'Auth user id missing after createUser' });
    }

    // 2) Create app user row
    const { data: appUser, error: appErr } = await supabaseAdmin
      .from('users')
      .insert({
        auth_user_id: authUserId,
        school_id,
        major_id,
        minor_id: minor_id ?? null,
        enrolled_semester,
        first_name: first_name ?? null,
        last_name: last_name ?? null,
        role: 'student',
      })
      .select('*')
      .single();

    if (appErr) {
      // Cleanup: if app user insert fails, delete auth user to avoid "orphaned" auth accounts
      await supabaseAdmin.auth.admin.deleteUser(authUserId);
      return res.status(400).json({ error: appErr.message });
    }

    return res.status(201).json({
      message: 'Signup success',
      user: appUser,
    });
  } catch (e) {
    return res.status(500).json({ error: e?.message ?? 'Unknown error' });
  }
}

/**
 * POST /api/auth/login
 * body: { email, password }
 *
 * Returns Supabase session (access_token, refresh_token, user, etc.)
 * Uses ANON key client (public client), not the service role client.
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }

    const { data, error } = await supabasePublic.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });

    // data includes: session (access_token/refresh_token), user
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: e?.message ?? 'Unknown error' });
  }
}

//아직 괜춘 but the frontend should must
//when client click logout, then
//localStorage.removeItem("access_token");
//localStorage.removeItem("refresh_token");
//and return to the login page or home or etc.....
export function logout(req, res) {
  return res.json({ message: 'Logout successful' });
}
