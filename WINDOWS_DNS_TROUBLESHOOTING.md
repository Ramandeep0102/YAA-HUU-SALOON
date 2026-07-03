# 🌐 DNS Resolution Troubleshooting: Supabase on Windows

## 🔴 Error: `net::ERR_NAME_NOT_RESOLVED`

**What it means:** Your Windows machine cannot resolve the domain name `rsysipwfttsvdxajgdt.supabase.co` to an IP address.

**Root causes:**
- ❌ ISP blocking Supabase domain
- ❌ Corporate/Local Firewall blocking domain
- ❌ DNS server issues
- ❌ Network adapter problems
- ❌ DNS cache corruption
- ❌ Proxy configuration issues

---

## 🚀 Quick Fixes (Try These First)

### Fix #1: Restart Your Network (2 minutes)
```powershell
# Open PowerShell as Administrator
# Run these commands:

# Flush DNS cache
ipconfig /flushdns

# Release and renew DHCP
ipconfig /release
ipconfig /renew

# Restart network
ipconfig /all
```

**Then:**
1. Close all browsers
2. Reopen browser
3. Go to `http://localhost:3000`
4. Try booking

---

### Fix #2: Change DNS Server (Google's Public DNS)
Windows automatically uses your ISP's DNS. Google's DNS is more reliable.

#### Option A: GUI (Easiest)
1. **Windows Key** → Type `Network Settings` → Press Enter
2. Click **Ethernet** or **WiFi** (whichever you use)
3. Scroll down → Click **Edit** next to "DNS server assignment"
4. Change from **Automatic** to **Manual**
5. Toggle **IPv4** to **ON**
6. Set DNS to:
   - Primary: `8.8.8.8` (Google DNS)
   - Secondary: `8.8.4.4` (Google DNS)
7. Click **Save**
8. Restart your browser

#### Option B: PowerShell (Advanced)
```powershell
# Run as Administrator

# Check current DNS
Get-DnsClientServerAddress

# Set Google DNS for Ethernet adapter
Set-DnsClientServerAddress -InterfaceAlias "Ethernet" -ServerAddresses ("8.8.8.8", "8.8.4.4")

# Or for WiFi
Set-DnsClientServerAddress -InterfaceAlias "WiFi" -ServerAddresses ("8.8.8.8", "8.8.4.4")

# Verify DNS changed
Get-DnsClientServerAddress
```

---

### Fix #3: Test DNS Resolution

#### Check if domain resolves:
```powershell
# Open PowerShell and run:
nslookup rsysipwfttsvdxajgdt.supabase.co

# Expected output:
# Server:  8.8.8.8
# Address: 8.8.8.8
#
# Non-authoritative answer:
# Name:    rsysipwfttsvdxajgdt.supabase.co
# Addresses: 34.xxx.xxx.xxx (some IP)
```

**If you see:**
- ✅ An IP address → DNS works, problem is elsewhere
- ❌ `Name or service not known` → DNS is blocked or down

---

### Fix #4: Clear Browser Cache & DNS Cache
```powershell
# As Administrator:

# Flush Windows DNS cache
ipconfig /flushdns

# Flush Chrome DNS cache specifically
# 1. Type in browser: chrome://net-internals/#dns
# 2. Click "Clear host cache"

# Or restart Chrome completely:
# 1. Close all Chrome windows
# 2. Press Ctrl+Shift+Delete
# 3. Select "All time"
# 4. Check "Cookies and other site data"
# 5. Click "Clear data"
# 6. Restart Chrome
```

---

## 🔍 Advanced Troubleshooting

### Step 1: Check if Supabase DNS is Globally Available
```powershell
# From PowerShell, use different DNS servers:

# Try Google DNS
nslookup rsysipwfttsvdxajgdt.supabase.co 8.8.8.8

# Try Cloudflare DNS
nslookup rsysipwfttsvdxajgdt.supabase.co 1.1.1.1

# Try OpenDNS
nslookup rsysipwfttsvdxajgdt.supabase.co 208.67.222.222
```

**If ANY of these work → Your ISP's DNS is blocked**
- Switch to that DNS server in Windows settings

**If NONE work → Different issue (internet down or Supabase down)**

---

### Step 2: Test Network Connectivity to Supabase

```powershell
# Test connectivity using tracert (trace route)
tracert rsysipwfttsvdxajgdt.supabase.co

# Test using ping (some ISPs block ICMP, so this might not work)
ping rsysipwfttsvdxajgdt.supabase.co

# Test using curl (most reliable)
curl -I https://rsysipwfttsvdxajgdt.supabase.co
```

**Expected output from curl:**
```
HTTP/2 401
date: Thu, 03 Jul 2026 ...
...
(This means connection worked, auth failed, which is OK for curl test)
```

**If you get:**
- ❌ `Could not resolve host` → DNS issue
- ❌ `Connection timed out` → Firewall blocking
- ✅ HTTP response → Network OK

---

### Step 3: Check Windows Firewall

#### See if Firewall is blocking:
1. **Windows Key** → Type `Windows Defender Firewall` → Click "Advanced settings"
2. Click **Outbound Rules** (left sidebar)
3. Look for any rules blocking `rsysipwfttsvdxajgdt.supabase.co` or port 443
4. If found, delete or modify to allow
5. Try booking again

#### Allow HTTPS outbound (if needed):
```powershell
# Run as Administrator

# Add rule to allow HTTPS
New-NetFirewallRule -DisplayName "Allow Supabase HTTPS" `
  -Direction Outbound `
  -Action Allow `
  -Protocol TCP `
  -RemotePort 443 `
  -RemoteAddress "any"

# Verify rule created
Get-NetFirewallRule -DisplayName "Allow Supabase HTTPS"
```

---

### Step 4: Check for Proxy Issues

#### Check if proxy is configured:
```powershell
# Open Settings
# Windows Key → Settings → System → Proxy

# Look for:
# - Manual proxy setup (should be OFF for normal internet)
# - Automatic proxy setup (should be unchecked)
# - Proxy server (should be empty)
```

#### If proxy is enabled:
1. **Settings** → **Network & Internet** → **Proxy**
2. Turn OFF "Use a proxy server"
3. Restart browser

#### Or disable from PowerShell:
```powershell
# Check current proxy
netsh winhttp show proxy

# Reset to no proxy
netsh winhttp reset proxy

# Verify
netsh winhttp show proxy
```

---

### Step 5: ISP-Level Blocking Check

ISPs sometimes block specific domains (especially APIs). Test this:

```powershell
# Try VPN or different network:

# Option 1: Use Mobile Hotspot
# 1. Share internet from your phone
# 2. Connect laptop to phone WiFi
# 3. Try booking

# Option 2: Use Online DNS Checker
# Visit: https://mxtoolbox.com/
# Search: rsysipwfttsvdxajgdt.supabase.co
# If it resolves online but not locally → ISP blocking

# Option 3: Check from another device
# Use same WiFi on phone or tablet
# Visit: http://[your-laptop-ip]:3000
# If works on phone → Computer/Firewall issue
# If doesn't work on phone → Router/ISP issue
```

---

## ✅ Complete Troubleshooting Workflow

### Step 1: Quick Diagnostics
```powershell
# Run ALL these commands:

echo "=== Network Status ==="
ipconfig /all

echo "=== DNS Resolution Test ==="
nslookup rsysipwfttsvdxajgdt.supabase.co

echo "=== Connectivity Test ==="
curl -I https://rsysipwfttsvdxajgdt.supabase.co

echo "=== Current DNS ==="
Get-DnsClientServerAddress

echo "=== Firewall Status ==="
netsh advfirewall show allprofiles
```

### Step 2: Fix Issues Found
Based on output above, apply appropriate fix from this guide

### Step 3: Verify Fix
```powershell
# Flush DNS
ipconfig /flushdns

# Test again
nslookup rsysipwfttsvdxajgdt.supabase.co

# Restart browser
# Try booking
```

---

## 🆘 If Still Not Working

### Gather This Information:

```powershell
# Run this diagnostic script and share output:

Write-Host "=== DIAGNOSTIC INFO ===" -ForegroundColor Green

Write-Host "`nNetwork Status:" -ForegroundColor Yellow
ipconfig /all

Write-Host "`nDNS Test:" -ForegroundColor Yellow
nslookup rsysipwfttsvdxajgdt.supabase.co

Write-Host "`nConnectivity Test:" -ForegroundColor Yellow
curl -I https://rsysipwfttsvdxajgdt.supabase.co 2>&1 | Select-Object -First 10

Write-Host "`nDNS Servers:" -ForegroundColor Yellow
Get-DnsClientServerAddress

Write-Host "`nFirewall Status:" -ForegroundColor Yellow
netsh advfirewall show allprofiles

Write-Host "`nDNS Cache:" -ForegroundColor Yellow
Get-DnsClientCache | Where-Object {$_.Name -like "*supabase*"}

Write-Host "`n=== END DIAGNOSTIC ===" -ForegroundColor Green
```

---

## 📋 ISP/Firewall Contact Information

If ISP is blocking Supabase:

**What to tell your ISP:**
```
"I'm unable to access rsysipwfttsvdxajgdt.supabase.co (Supabase backend for my app development).
The DNS query for this domain returns NXDOMAIN from your DNS servers.

Can you please:
1. Check if this domain is blocked in your firewall
2. Whitelist rsysipwfttsvdxajgdt.supabase.co
3. Or allow API access on port 443 (HTTPS)"
```

**Alternative:** Use a VPN service (Mullvad, Proton VPN, etc.) - they bypass ISP DNS

---

## 🔧 Additional Network Fixes

### Fix: Reset Network Stack
```powershell
# Run as Administrator
# WARNING: This resets all network adapters

netsh int ip reset resetlog.txt
netsh int ipv4 reset resetlog.txt
netsh winsock reset catalog
netsh int tcp reset all

# Restart computer
Restart-Computer
```

### Fix: Update Network Drivers
1. **Device Manager** (right-click Windows Start)
2. Expand **Network adapters**
3. Right-click your adapter (Ethernet/WiFi)
4. Select **Update driver**
5. Select **Search automatically for drivers**
6. Restart computer

---

## ✨ Final Checklist

- [ ] Ran `ipconfig /flushdns`
- [ ] Changed DNS to `8.8.8.8` and `8.8.4.4`
- [ ] Restarted browser completely (not just refresh)
- [ ] Checked Windows Firewall settings
- [ ] Disabled proxy if enabled
- [ ] Tested with `nslookup rsysipwfttsvdxajgdt.supabase.co`
- [ ] If mobile hotspot works, contacted ISP
- [ ] Tried from different device on same WiFi

---

## 🎯 Most Likely Solutions (in order)

1. **60%** → ISP/DNS blocking → Change to Google DNS (8.8.8.8)
2. **20%** → DNS cache issue → Run `ipconfig /flushdns`
3. **10%** → Windows Firewall → Disable or add rule for port 443
4. **7%** → Proxy enabled → Disable in settings
5. **3%** → ISP actively blocking → Use VPN or contact ISP

---

**Status:** Try Fix #1 and #2 first. Let me know the output of your diagnostic!

