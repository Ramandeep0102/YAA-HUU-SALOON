# 🚀 SUPABASE "Failed to Fetch" - Quick Start Debugging

**Status:** You're getting `TypeError: Failed to fetch` ❌

This guide walks you through fixing it step-by-step.

---

## 🏃 5-Minute Quick Fix (Try These First)

### Step 1️⃣: Clear Cache & Restart Dev Server
```bash
# In terminal:
npm run dev
# Press Ctrl+C to stop
npm run dev  # Restart

# In browser:
- Press Ctrl+Shift+R (hard refresh)
- Or Ctrl+Shift+Delete → Clear browsing data → All time
```

### Step 2️⃣: Test in Incognito Mode (Disable Extensions)
1. Press **Ctrl+Shift+N** (Windows) or **Cmd+Shift+N** (Mac)
2. Go to `http://localhost:3000`
3. Try booking again
4. ✅ **If it works in Incognito** → Browser extension issue
   - Go to `chrome://extensions/` and disable ad-blockers/VPNs

### Step 3️⃣: Try Different Browser
- Chrome → Firefox → Safari → Edge
- ✅ **If it works in one browser** → Browser-specific issue

### Step 4️⃣: Open Browser Console & Run Diagnostic
1. Press **F12** to open DevTools
2. Click the **Console** tab
3. Copy the contents of `BROWSER_CONSOLE_DEBUGGER.js` from this project
4. Paste it into the console and press **Enter**
5. **Share the output** - it will tell us exactly what's wrong

---

## 🔍 Understanding the Error Output

### If Diagnostic Says: ✅ All Tests Passed
→ **Check your column names!**
```typescript
// ❌ WRONG - These don't exist
client_name      ← Not "clientName"
booking_date     ← Not "date"
created_at       ← Might not exist, check Supabase

// ✅ VERIFY in Supabase Dashboard
go to: Tables → bookings → Check exact column names
```

### If Diagnostic Says: ❌ Read/Write Access Denied
→ **RLS Policies Issue**
```sql
-- In Supabase: SQL Editor
-- Disable RLS temporarily for debugging:
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- Then enable with a permissive policy:
CREATE POLICY "Enable insert for all" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for all" ON bookings
  FOR SELECT USING (true);
```

### If Diagnostic Says: ❌ Network/CORS Failed
→ **Internet or Firewall Issue**
- Check if you're offline: `navigator.onLine` in console
- Try using a VPN or different network
- Check if your ISP/company blocks Supabase (rsysipwfttsvdxajgdt.supabase.co)

---

## 📊 Step-by-Step Full Debug Guide

### 1. Check Environment Variables
```javascript
// In browser console:
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
```
Both should show real values, NOT "undefined"

### 2. Verify Supabase Connection
```javascript
// In browser console:
import { supabase } from './src/lib/supabaseClient.ts';

// Check console for initialization messages
// Should see: ✅ Supabase client initialized successfully!
```

### 3. Test Direct Database Query
```javascript
// In browser console:
const { data, error } = await supabase
  .from('bookings')
  .select('*')
  .limit(1);

console.log('Data:', data);
console.log('Error:', error);
```
- ✅ If error is null → Read access works
- ❌ If error exists → RLS or permissions issue

### 4. Check Network Tab
1. Open **Network tab** (F12 → Network)
2. Clear existing requests (🚫 icon)
3. Try booking
4. Look for request to: `https://rsysipwfttsvdxajgdt.supabase.co/rest/v1/bookings`
5. Check the **Status** column:

| Status | Meaning | Fix |
|--------|---------|-----|
| **201** or **200** | ✅ Success | Working! |
| **0** | ❌ Network error | Check internet/firewall |
| **400** | ❌ Bad request | Check column names |
| **403** | ❌ Permission denied | Disable RLS or fix policies |
| **404** | ❌ Table not found | Check table name is "bookings" |
| **500** | ❌ Server error | Contact Supabase support |

### 5. Analyze Response Body
1. Right-click the failing request → **Inspect**
2. Go to **Response** tab
3. Look for error message
4. Common errors:
```
"column does not exist" → Wrong column name
"permission denied" → RLS policy issue
"relation does not exist" → Wrong table name
"Failed to fetch" → Network/CORS issue
```

---

## ✅ Checklist: What Could Be Wrong

- [ ] `.env.local` has correct URL and key
- [ ] Dev server restarted after changing `.env.local`
- [ ] `supabaseClient.ts` is in `src/lib/` directory
- [ ] `BookingForm.tsx` imports from `'../lib/supabaseClient'`
- [ ] Table name is exactly `'bookings'` (not `'appointments'`)
- [ ] All column names use snake_case:
  - [ ] `service_id`, `service_name`
  - [ ] `stylist_id`, `stylist_name`
  - [ ] `booking_date`, `booking_time`
  - [ ] `client_name`, `client_phone`, `client_email`
  - [ ] `created_at`
- [ ] RLS is disabled OR policies are set to permissive
- [ ] No browser extensions blocking requests
- [ ] Tested in Incognito mode

---

## 🆘 Still Stuck? Gather This Info

Share these outputs when asking for help:

### 1. Browser Console Output
```javascript
// Run this in console:
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Auth header available:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('Online:', navigator.onLine);
console.log('Time:', new Date().toISOString());
```

### 2. Network Tab Screenshot
1. Open DevTools Network tab
2. Try booking
3. Screenshot the failed request details

### 3. Browser Console Error
```javascript
// Try booking and share the exact error from console
// Example:
// TypeError: Failed to fetch
// at handleBookingSubmit (BookingForm.tsx:77)
```

### 4. Supabase Table Schema
```sql
-- In Supabase SQL Editor, run:
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'bookings';
```
Share the output

### 5. RLS Status
```sql
-- In Supabase SQL Editor, run:
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'bookings';
```
Should show `relrowsecurity = false` (RLS disabled)

---

## 🎯 Test Your Connection Now

### Option A: Use Included Diagnostic Script
1. Open browser console (F12)
2. Paste contents of `BROWSER_CONSOLE_DEBUGGER.js`
3. Press Enter
4. Review results

### Option B: Manual Test
```javascript
// Test 1: Can you reach Supabase?
fetch('https://rsysipwfttsvdxajgdt.supabase.co/rest/v1/')
  .then(r => console.log('Status:', r.status))
  .catch(e => console.error('Failed:', e.message));

// Test 2: Can you insert?
const { data, error } = await supabase
  .from('bookings')
  .insert([{ id: 'test', /* ...other fields... */ }]);
console.log('Success:', !error);
console.log('Error:', error?.message);
```

---

## 📚 Files Used for Debugging

- ✅ `SUPABASE_DEBUG_GUIDE.md` - Comprehensive reference guide
- ✅ `BROWSER_CONSOLE_DEBUGGER.js` - Automated diagnostic tool
- ✅ `src/lib/supabaseClient.ts` - Enhanced with logging
- ✅ `src/components/BookingForm.tsx` - Enhanced error details

---

## 🚀 Next Steps After Fix

Once booking works:

1. **Verify data in Supabase Dashboard**
   - Go to Tables → bookings
   - Check new records appear

2. **Add Edit/Delete functionality**
   - Update existing bookings
   - Cancel bookings

3. **Add Client-side validation**
   - Phone number format
   - Date in future
   - No duplicate bookings

4. **Deploy to Production**
   - Verify `.env.local` is NOT in git
   - Set production environment variables
   - Test with real Supabase project

---

Good luck! 🍀 Let me know if you need help with any step.
