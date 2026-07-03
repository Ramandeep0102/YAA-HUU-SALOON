# 🚀 QUICK ACTION PLAN - DNS & Dev Server Issues

## Issue #1: `npm not recognized` 

### Fix Immediately:
```powershell
# Open NEW PowerShell (close current one first)
# Right-click Start → Windows Terminal (Administrator)

# Verify Node.js is installed:
node --version
npm --version

# If not found, reinstall Node.js from: https://nodejs.org/
# (Download LTS version, installer will add to PATH)
```

After fixing npm path:
```powershell
cd c:\Users\Admin\Downloads\yaa-huu-salon
npm install
npm run dev
```

---

## Issue #2: `net::ERR_NAME_NOT_RESOLVED` 

### This means: Your Windows DNS cannot resolve `rsysipwfttsvdxajgdt.supabase.co`

### 🏃 Quick Fix (2 minutes):

**Step 1: Flush DNS**
```powershell
# Right-click Start → Run (Win+R)
# Type: powershell
# Right-click → Run as Administrator
# Paste this:

ipconfig /flushdns
ipconfig /renew
```

**Step 2: Change DNS to Google's**
1. **Settings** → **Network & Internet**
2. Select **WiFi** or **Ethernet** (whichever you use)
3. Click **Edit** next to "DNS server assignment"
4. Change to **Manual**
5. Toggle **IPv4** to **ON**
6. Set DNS to:
   - Primary: `8.8.8.8`
   - Secondary: `8.8.4.4`
7. **Save**

**Step 3: Verify It Works**
```powershell
# Open new PowerShell (Administrator) and test:

nslookup rsysipwfttsvdxajgdt.supabase.co 8.8.8.8

# Should show an IP address (success!)
# If it works here but not in browser, clear browser cache:
# Ctrl+Shift+Delete → Clear ALL data → Restart browser
```

---

## 🎯 Root Cause

Your ISP's DNS server is likely **blocking** the Supabase domain.

**Solution:** Use Google's public DNS instead of ISP's DNS.

---

## ✅ Complete Workflow

```
1. Fix npm PATH issue
   └─ Restart PowerShell & verify: node --version

2. Flush DNS cache
   └─ Run: ipconfig /flushdns

3. Change to Google DNS (8.8.8.8)
   └─ Settings → Network → DNS

4. Verify DNS resolution
   └─ nslookup rsysipwfttsvdxajgdt.supabase.co 8.8.8.8

5. Clear browser cache
   └─ Ctrl+Shift+Delete

6. Restart dev server
   └─ npm run dev

7. Test booking
   └─ Fill form → Click confirm → Check console
```

---

## 📋 Specific Commands (Copy & Paste)

### PowerShell (As Administrator):
```powershell
# Test if DNS is the issue
nslookup rsysipwfttsvdxajgdt.supabase.co

# Test with Google DNS
nslookup rsysipwfttsvdxajgdt.supabase.co 8.8.8.8

# Test connectivity
curl -I https://rsysipwfttsvdxajgdt.supabase.co

# Set Google DNS for your adapter
Set-DnsClientServerAddress -InterfaceAlias "WiFi" -ServerAddresses ("8.8.8.8", "8.8.4.4")
# OR for Ethernet:
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("8.8.8.8", "8.8.4.4")

# Verify DNS changed
Get-DnsClientServerAddress
```

---

## 🔄 If Google DNS Doesn't Work

Try Cloudflare DNS:
```powershell
# Test with Cloudflare
nslookup rsysipwfttsvdxajgdt.supabase.co 1.1.1.1

# Set Cloudflare DNS
Set-DnsClientServerAddress -InterfaceAlias "WiFi" -ServerAddresses ("1.1.1.1", "1.0.0.1")
```

Or try with VPN:
- Download **Mullvad VPN** (free, open-source)
- Connect to any server
- Test if booking works
- If works with VPN → ISP is definitely blocking

---

## 📞 Contact Your ISP (If Needed)

Tell them:
> "I cannot access rsysipwfttsvdxajgdt.supabase.co. Your DNS returns NXDOMAIN. 
> Please whitelist this domain or allow HTTPS (port 443) traffic to API servers."

---

## ✨ Summary

| Issue | Solution |
|-------|----------|
| `npm not recognized` | Restart PowerShell or reinstall Node.js |
| `net::ERR_NAME_NOT_RESOLVED` | Change DNS to 8.8.8.8 (Google DNS) |
| Still failing after DNS change | Use VPN or contact ISP |

---

**Next Steps:**
1. ✅ Fix npm issue
2. ✅ Test DNS with `nslookup` command
3. ✅ Change to Google DNS
4. ✅ Restart browser
5. ✅ Try booking

Let me know if you get past these errors! 🚀

