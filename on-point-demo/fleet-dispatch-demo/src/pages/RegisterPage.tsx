import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { useAuthStore } from '../stores/authStore';
import { LoaderIcon, CheckCircle2Icon } from 'lucide-react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Driver info (optional)
    driverLicense: '',
    age: '',
    yearsExperience: '',
    truckType: '',
  });

  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setStep(2);
  };

  const handleSkip = () => {
    completeRegistration();
  };

  const handleDriverInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeRegistration();
  };

  const completeRegistration = async () => {
    await register(formData);
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
          <h2 className="text-2xl font-bold text-stone-800">Create Account</h2>
          <p className="text-amber-700 mt-2 text-center">
            {step === 1 ? 'Enter your basic information' : 'Driver information (optional)'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6 gap-2">
          <div className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-red-600' : 'bg-amber-300'}`} />
          <div className={`h-1 w-12 ${step >= 2 ? 'bg-red-600' : 'bg-amber-300'}`} />
          <div className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-red-600' : 'bg-amber-300'}`} />
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-stone-700 font-medium">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Dachi Ghambashidze"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-stone-700 font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="dachi@onpoint.ge"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-stone-700 font-medium">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+995 555 123456"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
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
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-stone-700 font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold shadow-lg"
            >
              Continue
            </Button>
          </form>
        )}

        {/* Step 2: Driver Info (Optional) */}
        {step === 2 && (
          <form onSubmit={handleDriverInfoSubmit} className="space-y-4">
            <div className="bg-orange-50 border border-orange-300 rounded-lg p-4 mb-4">
              <p className="text-sm text-orange-900">
                <strong>Optional:</strong> Add driver information to get better load recommendations. You can skip this step.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="driverLicense" className="text-stone-700 font-medium">Driver License Number</Label>
              <Input
                id="driverLicense"
                type="text"
                placeholder="GE123456789"
                value={formData.driverLicense}
                onChange={(e) => handleChange('driverLicense', e.target.value)}
                className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-stone-700 font-medium">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="35"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
                  min="18"
                  max="70"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsExperience" className="text-stone-700 font-medium">Years Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  placeholder="10"
                  value={formData.yearsExperience}
                  onChange={(e) => handleChange('yearsExperience', e.target.value)}
                  className="h-11 bg-amber-50 border-amber-300 focus:border-red-500 focus:ring-red-500"
                  min="0"
                  max="50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="truckType" className="text-stone-700 font-medium">Truck Type</Label>
              <select
                id="truckType"
                value={formData.truckType}
                onChange={(e) => handleChange('truckType', e.target.value)}
                className="w-full h-11 bg-amber-50 border border-amber-300 rounded-md px-3 text-stone-900 focus:border-red-500 focus:ring-red-500"
              >
                <option value="">Select truck type</option>
                <option value="flatbed">Flatbed</option>
                <option value="dry-van">Dry Van</option>
                <option value="refrigerated">Refrigerated</option>
                <option value="tanker">Tanker</option>
                <option value="lowboy">Lowboy</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={handleSkip}
                variant="outline"
                className="flex-1 h-11 border-amber-300 text-stone-700 hover:bg-amber-50"
                disabled={isLoading}
              >
                Skip for Now
              </Button>
              <Button
                type="submit"
                className="flex-1 h-11 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle2Icon className="w-5 h-5 mr-2" />
                    Complete
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-600">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
