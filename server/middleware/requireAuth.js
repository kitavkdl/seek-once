// import { supabasePublic } from '../config/supabaseClient.js';

// export async function requireAuth(req, res, next) {
//   const header = req.headers.authorization || '';
//   const token = header.startsWith('Bearer ') ? header.slice(7) : null;
//   if (!token) return res.status(401).json({ error: 'Missing Bearer token' });

//   const { data, error } = await supabasePublic.auth.getUser(token);
//   if (error || !data?.user)
//     return res.status(401).json({ error: 'Invalid token' });

//   req.authUser = data.user;
//   next();
// }
import { supabaseAdmin, supabasePublic } from '../config/supabaseClient.js';

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing Bearer token' });

  // 1) Verify token -> get auth user (uuid)
  const { data: authData, error: authError } =
    await supabasePublic.auth.getUser(token);
  if (authError || !authData?.user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const authUser = authData.user; // auth.users row (uuid)
  req.authUser = authUser;

  // 2) Map uuid -> public.users row (bigint id)
  const { data: appUser, error: appUserError } = await supabaseAdmin
    .from('users')
    .select('id, role, school_id, major_id, minor_id, enrolled_semester')
    .eq('auth_user_id', authUser.id)
    .single();

  if (appUserError || !appUser) {
    return res
      .status(401)
      .json({ error: 'User profile not found in public.users' });
  }

  // 3) This is the bigint id you must use in user_course.user_id
  req.user = appUser;

  next();
}
