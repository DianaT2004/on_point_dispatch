import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { useAuthStore } from '../stores/authStore';
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  BadgeCheckIcon,
} from 'lucide-react';

export default function SettingsPage() {
  const { user, updateStatus } = useAuthStore();

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile and preferences
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Profile */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <UserIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
          </div>

          <div className="flex items-center gap-6 mb-6">
            <Avatar className="w-20 h-20 border-4 border-border">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl">
                {user?.name?.split(' ').map((n) => n[0]).join('') || 'JD'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground">{user?.name}</h3>
                {user?.verified && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <BadgeCheckIcon className="w-3 h-3" />
                    Verified Driver
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={user?.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={user?.phone} className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user?.email} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={user?.status}
                onValueChange={(value: any) => updateStatus(value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Online
                    </div>
                  </SelectItem>
                  <SelectItem value="busy">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      Busy
                    </div>
                  </SelectItem>
                  <SelectItem value="offline">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      Offline
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full md:w-auto">Save Changes</Button>
          </div>
        </Card>

        {/* Vehicle Info */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <TruckIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Vehicle Information</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cdl">CDL Number</Label>
                <Input id="cdl" value={user?.cdl} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="truck">Truck Number</Label>
                <Input id="truck" value={user?.truckNumber} className="mt-1" />
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <BellIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">New Load Alerts</div>
                <div className="text-sm text-muted-foreground">
                  Get notified when new loads match your preferences
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Dispatch Messages</div>
                <div className="text-sm text-muted-foreground">
                  Receive messages from dispatch team
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Route Updates</div>
                <div className="text-sm text-muted-foreground">
                  Traffic and weather alerts along your route
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Document Reminders</div>
                <div className="text-sm text-muted-foreground">
                  Reminders for required documentation
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <ShieldCheckIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Security</h2>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full md:w-auto">
              Change Password
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              Two-Factor Authentication
            </Button>
          </div>
        </Card>

        {/* Payment */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <CreditCardIcon className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Payment Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="bank">Bank Account</Label>
              <Input
                id="bank"
                placeholder="•••• •••• •••• 1234"
                className="mt-1"
              />
            </div>
            <Button variant="outline" className="w-full md:w-auto">
              Update Payment Method
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
