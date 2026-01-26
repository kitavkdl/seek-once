import { supabasePublic } from '../config/supabaseClient.js';

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing Bearer token' });

  const { data, error } = await supabasePublic.auth.getUser(token);
  if (error || !data?.user)
    return res.status(401).json({ error: 'Invalid token' });

  req.authUser = data.user;
  next();
}
