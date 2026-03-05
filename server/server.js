import express from 'express';
import cors from 'cors';
import { supabaseAdmin } from './config/supabaseClient.js';
import authRoutes from './routes/authRoutes.js';
import userCourseRoutes from './routes/userCourseRoutes.js'; // adjust path if needed

//wire routes
import majorRoutes from './routes/majorRoutes.js';
import minorRoutes from './routes/minorRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

async function testConnection() {
  // const { data, error } = await supabase.from('profiles').select('*').limit(1);
  const { error } = await supabaseAdmin.from('school').select('id').limit(1);

  if (error) console.error('❌ Supabase connection failed:', error.message);
  else console.log('✅ Connected to Supabase successfully');
}

testConnection();
app.use(cors());
app.use(express.json()); // allows JSON request bodies
app.use('/api/auth', authRoutes);
app.use('/api/majors', majorRoutes);
app.use('/api/minors', minorRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user-courses', userCourseRoutes);

app.listen(4000, () => {
  console.log('🚀 Server running on http://localhost:4000');
});

app.get('/api/debug', (req, res) => {
  res.json({ working: true });
});
