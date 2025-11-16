# 🚀 QUICK START - Logo Update

## 1️⃣ Copy Your Logo File

**Take this file:** `onpoint-logo.png` (from outputs folder)

**Place it here:** `fleet-dispatch-demo/public/onpoint-logo.png`

Your folder should look like:
```
fleet-dispatch-demo/
├── public/
│   └── onpoint-logo.png  ← PUT YOUR LOGO HERE!
├── src/
├── index.html
└── package.json
```

---

## 2️⃣ Find & Replace in 3 Files

### File 1: `src/components/TopBar.tsx`
**FIND:**
```tsx
<Truck className="h-8 w-8 text-blue-500" />
<span className="text-xl font-bold">FleetDispatch</span>
```

**REPLACE WITH:**
```tsx
<img src="/onpoint-logo.png" alt="OnPoint" className="h-8" />
```

---

### File 2: `src/components/Sidebar.tsx`
**FIND:**
```tsx
<Truck className="h-10 w-10 text-blue-500" />
<h1 className="text-2xl font-bold">FleetDispatch</h1>
```

**REPLACE WITH:**
```tsx
<img src="/onpoint-logo.png" alt="OnPoint" className="h-10" />
```

---

### File 3: `src/pages/LoginPage.tsx`
**FIND:**
```tsx
<Truck className="h-16 w-16 text-blue-500 mb-4" />
<h1 className="text-4xl font-bold mb-2">FleetDispatch</h1>
```

**REPLACE WITH:**
```tsx
<img src="/onpoint-logo.png" alt="OnPoint" className="h-16 mb-4" />
```

---

## 3️⃣ Update index.html

**File:** `index.html`

**FIND:**
```html
<link rel="icon" type="image/svg+xml" href="/truck-icon.svg" />
<title>FleetDispatch - AI-Powered Load Management</title>
```

**REPLACE WITH:**
```html
<link rel="icon" type="image/png" href="/onpoint-logo.png" />
<title>OnPoint - AI-Powered Load Management</title>
```

---

## 4️⃣ Restart Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ DONE!

Your logo should now appear on:
- ✅ Login page
- ✅ Top navigation bar
- ✅ Sidebar
- ✅ Browser tab (favicon)

---

## 🔍 Not Working? Check:

1. **File location:** Is logo in `/public/onpoint-logo.png`?
2. **File name:** Exactly `onpoint-logo.png` (no spaces)?
3. **Server:** Did you restart with `npm run dev`?
4. **Browser:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. **Path:** Logo path is `/onpoint-logo.png` (with leading slash)

---

## 📝 Bonus: Change All "FleetDispatch" to "OnPoint"

Use your editor's **Find & Replace All**:
- Find: `FleetDispatch`
- Replace: `OnPoint`

**Files to update:**
- All `.tsx` files in `src/`
- `README.md`
- `package.json`

---

## 🎨 Want Different Logo Sizes?

```tsx
<!-- Small logo (topbar) -->
<img src="/onpoint-logo.png" alt="OnPoint" className="h-8" />

<!-- Medium logo (sidebar) -->
<img src="/onpoint-logo.png" alt="OnPoint" className="h-10" />

<!-- Large logo (login) -->
<img src="/onpoint-logo.png" alt="OnPoint" className="h-16" />
```

The `h-8`, `h-10`, `h-16` control the height. Change as needed!

---

That's it! 🎉
