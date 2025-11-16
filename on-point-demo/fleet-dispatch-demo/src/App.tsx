import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from './stores/authStore';
import { Toaster } from './components/ui/toaster';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileNav from './components/MobileNav';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoadsPage from './pages/LoadsPage';
import ServicesPage from './pages/ServicesPage';
import DocumentsPage from './pages/DocumentsPage';
import MapPage from './pages/MapPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

// Page transition animation component
function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.98 }}
      transition={{
        type: 'tween',
        ease: 'anticipate',
        duration: 0.4
      }}
    >
      {children}
    </motion.div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <main className="pt-16 lg:pt-20">{children}</main>
      </div>
      <MobileNav />
      <Toaster />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/loads" />} />
        <Route path="/loads" element={<AnimatedPage><LoadsPage /></AnimatedPage>} />
        <Route path="/services" element={<AnimatedPage><ServicesPage /></AnimatedPage>} />
        <Route path="/documents" element={<AnimatedPage><DocumentsPage /></AnimatedPage>} />
        <Route path="/map" element={<AnimatedPage><MapPage /></AnimatedPage>} />
        <Route path="/chat" element={<AnimatedPage><ChatPage /></AnimatedPage>} />
        <Route path="/settings" element={<AnimatedPage><SettingsPage /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnimatedRoutes />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
