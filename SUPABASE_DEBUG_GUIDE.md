# 🔧 Supabase Network Debug Guide

## 📋 Quick Status Check

Your `.env.local` credentials:
- ✅ URL: `https://rsysipwfttsvdxajgdt.supabase.co`
- ✅ Anon Key: Valid JWT token detected

---

## 🚨 Common Causes of "Failed to fetch"

| Issue | Symptom | Fix |
|-------|---------|-----|
| **Table name mismatch** | 404 error in Network tab | Check exact table name in Supabase |
| **CORS Issue** | Request fails before reaching Supabase | Disable RLS or configure policies |
| **Column names wrong** | 400 error (invalid JSON) | Use correct snake_case column names |
| **Network/Firewall** | Requests timeout | Test with simple fetch script |
| **Missing RLS policies** | 403 Forbidden even with RLS disabled | Verify RLS is actually disabled |

---

## 🧪 Step 1: Test Basic Connectivity (Browser Console)

Copy and paste this entire script into your browser console (F12) and run it:

```javascript
// ============================================
// SUPABASE CONNECTIVITY TEST
// ============================================

const SUPABASE_URL = 'https://rsysipwfttsvdxajgdt.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzeXNpcHdmdHRzdmRkeGFqZ2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNDY0OTUsImV4cCI6MjA5ODYyMjQ5NX0.RRuLFtKnwXQ63M94cS0IAQ8xeY02H46dCh1hSMmb89c';

console.log('🔍 SUPABASE CONNECTIVITY TEST\n');

async function testConnectivity() {
  try {
    console.log('1️⃣ Testing basic fetch to Supabase URL...');
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(`   Status: ${response.status} ${response.statusText}`);
    console.log(`   Headers:`, response.headers);
    
    if (!response.ok) {
      const text = await response.text();
      console.error(`   Error body: ${text}`);
    } else {
      console.log('   ✅ Basic connectivity OK!');
    }
  } catch (error) {
    console.error('   ❌ Connection failed:', error.message);
    console.error('   Details:', error);
  }

  try {
    console.log('\n2️⃣ Testing OPTIONS preflight request...');
    const preflightResponse = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
      method: 'OPTIONS',
    });
    console.log(`   Preflight Status: ${preflightResponse.status}`);
    console.log(`   CORS Headers Present:`, {
      'Access-Control-Allow-Origin': preflightResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': preflightResponse.headers.get('Access-Control-Allow-Methods'),
    });
  } catch (error) {
    console.error('   ⚠️ Preflight check failed:', error.message);
  }

  try {
    console.log('\n3️⃣ Testing bookings table read (GET)...');
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
    console.log(`   Status: ${getResponse.status}`);
    const data = await getResponse.json();
    console.log(`   Response:`, data);
    
    if (getResponse.ok) {
      console.log('   ✅ Read access OK!');
    } else {
      console.log('   ❌ Read access denied');
    }
  } catch (error) {
    console.error('   ❌ Read test failed:', error.message);
  }

  try {
    console.log('\n4️⃣ Testing bookings table write (INSERT)...');
    const testBooking = {
      id: `test-${Date.now()}`,
      service_id: 'test-service',
      service_name: 'Test Service',
      stylist_id: 'test-stylist',
      stylist_name: 'Test Stylist',
      booking_date: new Date().toISOString().split('T')[0],
      booking_time: '14:00 PM',
      client_name: 'Test Client',
      client_phone: '1234567890',
      client_email: 'test@example.com',
    };

    const insertResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/bookings`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(testBooking),
      }
    );
    
    console.log(`   Status: ${insertResponse.status}`);
    const responseText = await insertResponse.text();
    console.log(`   Response:`, responseText || '(no body)');
    
    if (insertResponse.ok || insertResponse.status === 201) {
      console.log('   ✅ Write access OK!');
    } else {
      console.log('   ❌ Write access denied');
    }
  } catch (error) {
    console.error('   ❌ Write test failed:', error.message);
  }

  console.log('\n✅ Connectivity test complete! Check results above.');
}

testConnectivity();
```

---

## 🔍 Step 2: Analyze Network Tab

1. Open Chrome DevTools (F12 → Network tab)
2. Trigger your booking form submission
3. Look for request to: `https://rsysipwfttsvdxajgdt.supabase.co/rest/v1/bookings`

**Check these:**

| Header | What to look for |
|--------|-----------------|
| **Status** | Should be `201` (created) or `200` (ok). If `0` → network issue |
| **Type** | Should be `fetch` |
| **Response** | Should show inserted data or be empty |
| **Access-Control-Allow-Origin** | Should be `*` or your domain |
| **Content-Type** | Should be `application/json` |

---

## 🛠️ Step 3: Verify Supabase Table Configuration

Go to [Supabase Dashboard](https://app.supabase.com) → Your Project → SQL Editor

Run this query to check your `bookings` table:

```sql
-- Check table structure
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'bookings'
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'bookings';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'bookings';
```

---

## ✅ Step 4: Verify BookingForm is Using Correct Table Name

Check your `BookingForm.tsx` line where you insert:

```typescript
// ❌ WRONG - Looking for 'appointments' table
await supabase.from('appointments').insert([...]);

// ✅ CORRECT - Using 'bookings' table
await supabase.from('bookings').insert([...]);
```

---

## 🌐 Step 5: Test in Different Environment

### Option A: Incognito Window (No Extensions)
1. Press `Ctrl+Shift+N` (Windows) or `Cmd+Shift+N` (Mac)
2. Go to `http://localhost:3000` in incognito window
3. Try booking again
4. Check if it works

### Option B: Different Browser
- Try Chrome, Firefox, Safari, or Edge
- If it works in one browser but not another → Browser extension issue

### Option C: Check Browser Extensions
1. Go to `chrome://extensions/`
2. Look for ad-blockers, privacy extensions
3. Disable them temporarily
4. Refresh page and try again

---

## 🔐 Step 6: Verify Supabase Configuration

### Check RLS is Actually Disabled:

1. Go to Supabase Dashboard
2. Navigate to: **Authentication → Policies**
3. Select table: **bookings**
4. You should see: **"No policies"** message

### If RLS is enabled, either:

**Option A: Disable RLS completely** (for development)
```sql
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
```

**Option B: Create a permissive policy** (recommended for production)
```sql
CREATE POLICY "Enable insert for all users" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for all users" ON bookings
  FOR SELECT USING (true);
```

---

## 📝 Step 7: Enhanced Error Logging

Update your `BookingForm.tsx` `handleBookingSubmit` with detailed logging:

```typescript
const handleBookingSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedService || !selectedStylist || !selectedDate || !selectedTime || !clientName || !clientPhone) return;

  setIsLoading(true);
  setError(null);

  const newAppointment: Appointment = {
    id: `app-${Date.now()}`,
    serviceId: selectedService.id,
    serviceName: selectedService.name,
    stylistId: selectedStylist.id,
    stylistName: selectedStylist.name,
    date: selectedDate,
    time: selectedTime,
    clientName,
    clientPhone,
    clientEmail,
    createdAt: new Date().toISOString(),
  };

  console.log('📤 Attempting to insert booking:', newAppointment);

  try {
    const { error: supabaseError, data } = await supabase
      .from('bookings')
      .insert([
        {
          id: newAppointment.id,
          service_id: newAppointment.serviceId,
          service_name: newAppointment.serviceName,
          stylist_id: newAppointment.stylistId,
          stylist_name: newAppointment.stylistName,
          booking_date: newAppointment.date,
          booking_time: newAppointment.time,
          client_name: newAppointment.clientName,
          client_phone: newAppointment.clientPhone,
          client_email: newAppointment.clientEmail,
          created_at: newAppointment.createdAt,
        },
      ]);

    if (supabaseError) {
      console.error('❌ Supabase Error:', {
        message: supabaseError.message,
        code: supabaseError.code,
        details: supabaseError.details,
        hint: supabaseError.hint,
      });
      throw new Error(`Insert failed: ${supabaseError.message}`);
    }

    console.log('✅ Booking inserted successfully:', data);
    onBookingSuccess(newAppointment);
    setSuccessBooking(newAppointment);
    setStep(5);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Booking failed. Please try again.';
    console.error('❌ Full error object:', err);
    setError(errorMessage);
  } finally {
    setIsLoading(false);
  }
};
```

---

## 🚀 Quick Fixes to Try

### Fix #1: Hardcode Credentials in Test
Update `supabaseClient.ts` temporarily:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rsysipwfttsvdxajgdt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzeXNpcHdmdHRzdmRkeGFqZ2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNDY0OTUsImV4cCI6MjA5ODYyMjQ5NX0.RRuLFtKnwXQ63M94cS0IAQ8xeY02H46dCh1hSMmb89c';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Fix #2: Clear Browser Cache
```
Ctrl+Shift+Delete → Clear browsing data → Restart dev server
```

### Fix #3: Check Exact Column Names
Your INSERT query must match exactly:
- `booking_date` (not `date`)
- `booking_time` (not `time`)
- `client_name` (not `clientName`)
- `service_id` (not `serviceId`)

---

## 📊 Debugging Checklist

- [ ] ✅ Run connectivity test script in browser console
- [ ] ✅ Check Network tab for exact error response
- [ ] ✅ Verify table name is `bookings` (not `appointments`)
- [ ] ✅ Verify all column names match (snake_case)
- [ ] ✅ Check RLS is disabled in Supabase Dashboard
- [ ] ✅ Test in Incognito window (no extensions)
- [ ] ✅ Restart dev server after any changes
- [ ] ✅ Check browser extensions aren't blocking requests

---

## 💬 If You Need Help

Share in order:
1. **Status code** from Network tab (0, 400, 403, 404, 500?)
2. **Error message** from browser console
3. **Response body** from Network tab → Response tab
4. **Output** from the connectivity test script above

---

