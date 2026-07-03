// ============================================
// SUPABASE NETWORK TROUBLESHOOTER
// ============================================
// Paste this ENTIRE script into your browser console (F12)
// and run it to diagnose network issues with Supabase

(async function supabaseNetworkDebugger() {
  const SUPABASE_URL = 'https://rsysipwfttsvdxajgdt.supabase.co';
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzeXNpcHdmdHRzdmRkeGFqZ2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNDY0OTUsImV4cCI6MjA5ODYyMjQ5NX0.RRuLFtKnwXQ63M94cS0IAQ8xeY02H46dCh1hSMmb89c';

  console.clear();
  console.log('='.repeat(60));
  console.log('🔧 SUPABASE NETWORK DIAGNOSTIC TOOL');
  console.log('='.repeat(60));

  // Test 1: Basic Network Connectivity
  console.log('\n📡 TEST 1: Basic Network Connectivity');
  console.log('-'.repeat(60));
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    console.log(`✅ Status Code: ${response.status} ${response.statusText}`);
    console.log(`   Content-Type: ${response.headers.get('Content-Type')}`);
    console.log(`   Server: ${response.headers.get('Server')}`);
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ FAILED: ${error.message}`);
      if (error.message.includes('abort')) {
        console.log('   💡 Suggestion: Request timed out. Check your internet connection.');
      }
    }
  }

  // Test 2: CORS Preflight
  console.log('\n🔐 TEST 2: CORS Preflight Check');
  console.log('-'.repeat(60));
  
  try {
    const preflightResponse = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      method: 'OPTIONS',
    });
    
    const corsHeaders = {
      'Origin': preflightResponse.headers.get('Access-Control-Allow-Origin'),
      'Methods': preflightResponse.headers.get('Access-Control-Allow-Methods'),
      'Headers': preflightResponse.headers.get('Access-Control-Allow-Headers'),
      'Credentials': preflightResponse.headers.get('Access-Control-Allow-Credentials'),
    };
    
    console.log(`✅ Preflight Status: ${preflightResponse.status}`);
    console.log('   CORS Headers:');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      console.log(`   • ${key}: ${value || '(not set)'}`);
    });
    
  } catch (error) {
    console.error(`⚠️  Preflight test error:`, error instanceof Error ? error.message : error);
  }

  // Test 3: GET Request (Read Permission)
  console.log('\n📖 TEST 3: Read Permission (GET)');
  console.log('-'.repeat(60));
  
  try {
    const getResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/bookings?select=*&limit=1`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const responseData = await getResponse.json();
    
    if (getResponse.ok) {
      console.log(`✅ Status: ${getResponse.status} - Read access ALLOWED`);
      console.log(`   Found ${Array.isArray(responseData) ? responseData.length : 0} records`);
    } else {
      console.error(`❌ Status: ${getResponse.status} - Read access DENIED`);
      console.error('   Response:', responseData);
    }
    
  } catch (error) {
    console.error(`❌ Read test failed:`, error instanceof Error ? error.message : error);
  }

  // Test 4: POST Request (Write Permission)
  console.log('\n✍️  TEST 4: Write Permission (POST)');
  console.log('-'.repeat(60));
  
  try {
    const testRecord = {
      id: `diagnostic-test-${Date.now()}`,
      service_id: 'diag-test',
      service_name: 'Diagnostic Test',
      stylist_id: 'diag-test',
      stylist_name: 'Diagnostic Tester',
      booking_date: new Date().toISOString().split('T')[0],
      booking_time: '12:00 PM',
      client_name: 'Diagnostic Test',
      client_phone: '9999999999',
      client_email: 'test@diagnostic.local',
    };

    const postResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/bookings`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(testRecord),
      }
    );
    
    const responseText = await postResponse.text();
    
    if (postResponse.ok || postResponse.status === 201) {
      console.log(`✅ Status: ${postResponse.status} - Write access ALLOWED`);
      console.log('   Test record inserted successfully');
      try {
        const responseData = JSON.parse(responseText);
        console.log('   Response:', responseData);
      } catch {
        console.log('   (Empty response body - expected with return=minimal)');
      }
    } else {
      console.error(`❌ Status: ${postResponse.status} - Write access DENIED`);
      console.error('   Response:', responseText);
      
      // Parse common Supabase error responses
      try {
        const errorData = JSON.parse(responseText);
        if (errorData.message) {
          console.error('   Error Message:', errorData.message);
        }
        if (errorData.details) {
          console.error('   Details:', errorData.details);
        }
        if (errorData.hint) {
          console.error('   Hint:', errorData.hint);
        }
      } catch {}
    }
    
  } catch (error) {
    console.error(`❌ Write test failed:`, error instanceof Error ? error.message : error);
  }

  // Test 5: Environment & Browser Info
  console.log('\n🖥️  TEST 5: Environment Information');
  console.log('-'.repeat(60));
  console.log(`Browser: ${navigator.userAgent}`);
  console.log(`Online: ${navigator.onLine ? '✅ Yes' : '❌ No'}`);
  console.log(`Location: ${window.location.hostname}:${window.location.port}`);
  console.log(`Protocol: ${window.location.protocol}`);
  console.log(`Current Time: ${new Date().toISOString()}`);

  // Summary & Recommendations
  console.log('\n' + '='.repeat(60));
  console.log('📋 SUMMARY & RECOMMENDATIONS');
  console.log('='.repeat(60));
  console.log(`
✅ If all tests passed:
   • Your Supabase connection is working correctly
   • The issue might be in your component logic
   • Check that column names match exactly (snake_case)
   • Review the handleBookingSubmit function

❌ If Test 1 or 2 failed (Network/CORS):
   • Check your internet connection
   • Try in an Incognito window (Ctrl+Shift+N)
   • Disable browser extensions temporarily
   • Check if your firewall/ISP blocks Supabase IPs

❌ If Test 3 failed (Read access):
   • RLS policies may be blocking read access
   • Go to Supabase Dashboard → Authentication → Policies
   • Check the 'bookings' table policies

❌ If Test 4 failed (Write access):
   • Most common cause of "Failed to fetch"
   • Check column names in your INSERT statement
   • Verify column names are snake_case (not camelCase)
   • Check if RLS policies require authentication
   • Disable RLS in Supabase Dashboard temporarily

Column names must match EXACTLY:
   ✅ service_id, service_name, stylist_id, stylist_name
   ✅ booking_date, booking_time, client_name, client_phone
   ✅ client_email, created_at (or your_timestamp_field)
  `);

  console.log('\n💬 Next Steps:');
  console.log('1. Review the test results above');
  console.log('2. Check SUPABASE_DEBUG_GUIDE.md for detailed fixes');
  console.log('3. If issues persist, share the test results');
  console.log('='.repeat(60));

})();
