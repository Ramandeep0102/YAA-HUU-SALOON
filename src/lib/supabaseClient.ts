import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log environment variables during initialization
console.log('🔍 Supabase Client Initialization:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Loaded' : '❌ Missing');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Loaded' : '❌ Missing');

// Validation: Check if URL is valid
if (!supabaseUrl || !supabaseUrl.startsWith('https://')) {
  throw new Error(
    `❌ Invalid or missing VITE_SUPABASE_URL. 
    Expected: https://your-project.supabase.co
    Got: "${supabaseUrl}"
    
    ✅ Fix: Update your .env.local file with real Supabase credentials:
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key`
  );
}

if (!supabaseKey) {
  throw new Error(
    `❌ Missing VITE_SUPABASE_ANON_KEY in .env.local
    ✅ Fix: Add this to your .env.local file:
    VITE_SUPABASE_ANON_KEY=your-anon-key`
  );
}

// Create client
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Supabase client initialized successfully!');
console.log(`📍 Project URL: ${supabaseUrl}`);

// Advanced network diagnostics
console.log('\n🌐 Network Diagnostics:');
console.log('Current browser:', navigator.userAgent.split('/').pop());
console.log('Online status:', navigator.onLine ? '✅ Online' : '❌ Offline');
console.log('Current hostname:', window.location.hostname);
console.log('Current protocol:', window.location.protocol);

// Test preflight request on client initialization
async function testCORS() {
  try {
    console.log('\n🧪 Testing Supabase API connectivity...');
    const testResponse = await fetch(`${supabaseUrl}/rest/v1/appointments?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Content-Type': 'application/json',
      },
    });
    
    console.log(`✅ API test - Status: ${testResponse.status}`);
    console.log('CORS headers:', {
      'Access-Control-Allow-Origin': testResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': testResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Credentials': testResponse.headers.get('Access-Control-Allow-Credentials'),
    });
    if (testResponse.status === 401) {
      console.warn('⚠️ Root /rest/v1/ may be restricted for anon key. The appointments table query may still be valid if permissions are configured.');
    }
  } catch (error) {
    console.error('❌ CORS test failed:', error instanceof Error ? error.message : String(error));
  }
}

// Run CORS test after a small delay
setTimeout(testCORS, 100);
