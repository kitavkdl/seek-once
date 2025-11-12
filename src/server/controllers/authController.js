import { supabase } from '../config/supabaseClient.js';

export async function signUp(req, res) {
  try {
    const { email, password, full_name } = req.body;

    if (!email || !password || !full_name) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Step 1: create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    const user = data.user;

    // Step 2: create profile in the 'profiles' table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, full_name, role: 'student' }]);

    if (profileError)
      return res.status(400).json({ error: profileError.message });

    res.json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
