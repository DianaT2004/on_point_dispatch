import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useAuthStore } from '../stores/authStore';
import { LoaderIcon } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('john.driver@fleet.com');
  const [password, setPassword] = useState('demo123');
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate('/loads');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white shadow-2xl border-amber-200">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6 bg-white rounded-xl p-4 shadow-sm">
            <img 
              src="/images/onpoint-logo.jpg" 
              alt="OnPoint Logo" 
              className="h-20 w-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-stone-800">Welcome Back</h2>
          <p className="text-amber-700 mt-2 text-center">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-stone-700 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-stone-700 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-red-600 hover:text-red-700 font-semibold">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-amber-200 text-center text-sm text-stone-600">
          <p className="font-semibold mb-1">Demo credentials:</p>
          <p className="font-mono text-xs bg-amber-50 p-2 rounded border border-amber-200">
            john.driver@fleet.com / demo123
          </p>
        </div>
      </Card>
    </div>
  );
}
