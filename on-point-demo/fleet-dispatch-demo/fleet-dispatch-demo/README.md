# FleetDispatch Demo - AI-Powered Load Management

A comprehensive demo application showcasing AI-powered features for fleet dispatch and load management. Built for hackathon presentations with extensive UI animations and simulated AI workflows.

## 🎯 Demo Features

### ✨ AI-Powered Features
- **AI Load Scanning** - Animated scanning process that analyzes and ranks loads
- **Auto-Dispatch Flow** - Multi-step automated dispatch workflow with progress tracking
- **Smart Ranking** - AI scores for each load with visual indicators
- **Service Requests** - Automated message generation for emergency services
- **Document Generation** - AI-powered document creation with progress animation

### 📱 Pages & Functionality
1. **Login Page** - Mock authentication with loading states
2. **Loads Feed** - AI-ranked load listings with filters and sorting
3. **Load Details** - Embedded map, route info, and "Take Load" action
4. **Auto-Dispatch Modal** - Step-by-step dispatch process simulation
5. **Services Center** - Emergency services with location and contact
6. **Documents** - Document management with AI generation
7. **Maps** - Route visualization with waypoints
8. **Chat** - Real-time messaging with typing indicators
9. **Settings** - Driver profile and preferences

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎬 Demo Credentials

**Email:** john.driver@fleet.com  
**Password:** demo123

## 🎨 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Zustand** - State management
- **React Router** - Navigation
- **Lucide React** - Icons

## 📖 Demo Script for Video Presentation

1. **Start at Login**
   - Show the login screen with AI status indicator
   - Enter credentials and show loading animation

2. **Loads Feed**
   - Click "AI Scan" to demonstrate the scanning animation
   - Show AI scores and ranking
   - Click on a high-scoring load to view details

3. **Load Details & Auto-Dispatch**
   - View embedded map and route information
   - Click "Take Load" to trigger auto-dispatch
   - Watch the multi-step automation process
   - Show generated Bill of Lading

4. **Services Center**
   - Navigate to Services
   - Request a service (e.g., Fuel)
   - Show AI message drafting and sending animation

5. **Documents**
   - Click "Generate Document"
   - Show AI document generation progress
   - View generated documents

6. **Maps**
   - Show route visualization
   - Highlight waypoints and rest stops

7. **Chat**
   - Send a message
   - Show typing indicators and responses

## 🎯 Key Demo Highlights

### AI Animations
- Scanning progress bars with percentage
- Multi-step workflow animations
- Smooth state transitions
- Loading indicators throughout

### Visual Polish
- Gradient backgrounds and buttons
- Consistent spacing and typography
- Hover effects and transitions
- Mobile-responsive design

### Simulated Backend
- No real API calls needed
- All data mocked in frontend
- Realistic delays and responses
- Progressive state updates

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Radix UI components
│   ├── AutoDispatchModal.tsx
│   ├── LoadDetailModal.tsx
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   └── MobileNav.tsx
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── LoadsPage.tsx
│   ├── ServicesPage.tsx
│   ├── DocumentsPage.tsx
│   ├── MapPage.tsx
│   ├── ChatPage.tsx
│   └── SettingsPage.tsx
├── stores/             # Zustand state stores
│   ├── authStore.ts
│   ├── loadsStore.ts
│   ├── dispatchStore.ts
│   ├── servicesStore.ts
│   ├── documentsStore.ts
│   └── chatStore.ts
├── data/               # Mock data
│   └── mockData.ts
├── lib/                # Utility functions
│   └── utils.ts
├── hooks/              # Custom hooks
│   └── use-toast.ts
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🎭 Customization

### Adjust AI Scan Speed
Edit `src/stores/loadsStore.ts`:
```typescript
await new Promise((resolve) => setTimeout(resolve, 100)); // Change delay
```

### Modify Auto-Dispatch Steps
Edit `src/stores/dispatchStore.ts`:
```typescript
const dispatchSteps = [
  'Your custom step 1',
  'Your custom step 2',
  // Add more steps
];
```

### Add More Mock Data
Edit `src/data/mockData.ts` to add more loads, services, or documents.

## 🎥 Video Presentation Tips

1. **Keep it moving** - Don't dwell too long on any single screen
2. **Highlight AI features** - Emphasize the scanning and automation
3. **Show smooth transitions** - Let animations complete
4. **Demonstrate mobile** - Show responsive design
5. **End with impact** - Finish with the complete workflow

## 📝 Notes

- This is a **demo application** - no real backend integration
- All AI features are **simulated** for presentation purposes
- Data is **mocked** and resets on page refresh
- Designed for **visual impact** in hackathon presentations

## 🏆 Built for Hackathons

This demo is specifically designed to impress judges with:
- ✅ Clean, modern UI
- ✅ Smooth animations
- ✅ Complete user workflows
- ✅ AI-powered features
- ✅ Mobile-first design
- ✅ Professional polish

## 📄 License

MIT License - Feel free to use this demo for your hackathon presentations!
