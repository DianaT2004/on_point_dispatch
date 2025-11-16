import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { Toaster } from './components/ui/toaster';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileNav from './components/MobileNav';
import LoginPage from './pages/LoginPage';
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

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/loads" />} />
                  <Route path="/loads" element={<LoadsPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
