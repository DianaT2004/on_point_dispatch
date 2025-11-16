# 🎨 Logo Update Guide - Change FleetDispatch to OnPoint

## Step 1: Prepare Your Logo

**Rename your logo file to:** `onpoint-logo.png`

**Optimal sizes:**
- Main logo: 200x60px (or similar aspect ratio)
- Favicon: 32x32px or 64x64px

## Step 2: Place the Logo

### Option A: Public Folder (Recommended for simple access)
```
fleet-dispatch-demo/
└── public/
    ├── onpoint-logo.png     ← Full logo
    └── onpoint-favicon.png  ← Small icon (optional)
```

### Option B: Assets Folder (Recommended for bundling)
```
fleet-dispatch-demo/
└── src/
    └── assets/
        └── onpoint-logo.png
```

## Step 3: Update Components

### 📄 File: `src/components/TopBar.tsx`

**Find this:**
```tsx
<Truck className="h-8 w-8 text-blue-500" />
<span className="text-xl font-bold">FleetDispatch</span>
```

**Replace with:**
```tsx
<img src="/onpoint-logo.png" alt="OnPoint" className="h-8" />
```

### 📄 File: `src/components/Sidebar.tsx`

**Find this:**
```tsx
<Truck className="h-10 w-10 text-blue-500" />
<h1 className="text-2xl font-bold">FleetDispatch</h1>
```

**Replace with:**
```tsx
<img src="/onpoint-logo.png" alt="OnPoint" className="h-10" />
```

### 📄 File: `src/pages/LoginPage.tsx`

**Find this:**
```tsx
<Truck className="h-16 w-16 text-blue-500 mb-4" />
<h1 className="text-4xl font-bold mb-2">FleetDispatch</h1>
```

**Replace with:**
```tsx
<img src="/onpoint-logo.png" alt="OnPoint" className="h-16 mb-4" />
<h1 className="text-4xl font-bold mb-2">OnPoint</h1>
```

### 📄 File: `index.html`

**Find this:**
```html
<link rel="icon" type="image/svg+xml" href="/truck-icon.svg" />
<title>FleetDispatch - AI-Powered Load Management</title>
```

**Replace with:**
```html
<link rel="icon" type="image/png" href="/onpoint-logo.png" />
<title>OnPoint - AI-Powered Load Management</title>
```

## Step 4: Search and Replace All Text

Use your code editor's "Find and Replace" feature:

**Find:** `FleetDispatch`  
**Replace:** `OnPoint`

**Files to update:**
- All component files in `src/components/`
- All page files in `src/pages/`
- `README.md`
- `package.json` (name field)
- `index.html` (title)

## Step 5: Update Package Name

### 📄 File: `package.json`

```json
{
  "name": "onpoint-demo",
  "version": "1.0.0",
  ...
}
```

## Step 6: Test the Changes

1. Restart your development server:
```bash
npm run dev
```

2. Check these pages:
   - ✅ Login page - logo visible
   - ✅ Dashboard - logo in top bar
   - ✅ Sidebar - logo visible
   - ✅ Browser tab - favicon shows

## 🎯 If Using Assets Folder Instead

If you placed the logo in `src/assets/`, update imports:

```tsx
// Add this at the top of each component file
import logo from '@/assets/onpoint-logo.png';

// Then use it like this:
<img src={logo} alt="OnPoint" className="h-8" />
```

**Components that need the import:**
- `src/components/TopBar.tsx`
- `src/components/Sidebar.tsx`
- `src/pages/LoginPage.tsx`

## 🔍 Files to Update - Checklist

- [ ] Place logo in `/public/` or `/src/assets/`
- [ ] Update `src/components/TopBar.tsx`
- [ ] Update `src/components/Sidebar.tsx`
- [ ] Update `src/pages/LoginPage.tsx`
- [ ] Update `index.html` (title + favicon)
- [ ] Update `package.json` (name)
- [ ] Find & replace "FleetDispatch" → "OnPoint" across all files
- [ ] Test all pages

## 💡 Pro Tips

### Make Logo Responsive
```tsx
<img 
  src="/onpoint-logo.png" 
  alt="OnPoint" 
  className="h-8 md:h-10 w-auto"
/>
```

### Add Hover Effect
```tsx
<img 
  src="/onpoint-logo.png" 
  alt="OnPoint" 
  className="h-8 transition-transform hover:scale-105"
/>
```

### Dark Mode Compatible Logo
If you have two versions (light/dark):
```tsx
<img 
  src="/onpoint-logo-light.png" 
  alt="OnPoint" 
  className="h-8 dark:hidden"
/>
<img 
  src="/onpoint-logo-dark.png" 
  alt="OnPoint" 
  className="h-8 hidden dark:block"
/>
```

## ✅ Verification

After updating, verify:

1. **Login Page**: Logo appears correctly
2. **Top Bar**: Logo visible and properly sized
3. **Sidebar**: Logo shows in navigation
4. **Browser Tab**: Favicon displays
5. **Mobile View**: Logo is responsive

## 🚀 Done!

Your app should now show "OnPoint" instead of "FleetDispatch" everywhere!

---

**Need help?** Check that:
- File path is correct: `/public/onpoint-logo.png`
- File name matches exactly (case-sensitive)
- Dev server was restarted after changes
