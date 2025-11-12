import express from 'express';
import { supabase } from './config/supabaseClient.js';
import authRoutes from './routes/authRoutes.js';
const app = express();

async function testConnection() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  if (error) console.error('❌ Supabase connection failed:', error.message);
  else console.log('✅ Connected to Supabase successfully');
}

testConnection();
app.use(express.json()); // allows JSON request bodies
app.use('/api/auth', authRoutes);

app.listen(4000, () => {
  console.log('🚀 Server running on http://localhost:4000');
});
