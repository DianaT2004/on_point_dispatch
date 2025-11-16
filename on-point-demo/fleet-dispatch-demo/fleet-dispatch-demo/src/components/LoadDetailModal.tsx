import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLoadsStore } from '../stores/loadsStore';
import { MapPinIcon, DollarSignIcon, WeightIcon, RulerIcon, CalendarIcon, ClockIcon } from 'lucide-react';
import { formatCurrency, formatDistance, formatWeight } from '../lib/utils';

export default function LoadDetailModal() {
  const { selectedLoad, setSelectedLoad, takeLoad } = useLoadsStore();

  if (!selectedLoad) return null;

  const handleTakeLoad = () => {
    takeLoad(selectedLoad.id);
  };

  return (
    <Dialog open={!!selectedLoad} onOpenChange={() => setSelectedLoad(null)}>
      <DialogContent className="max-w-2xl bg-card text-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-foreground">Load Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Static Route Map */}
          <div className="aspect-video w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden relative border-2 border-border">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 800 450">
                {/* Grid pattern */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="800" height="450" fill="url(#grid)" className="text-gray-400" />
              </svg>
            </div>
            
            {/* Route Line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              
              {/* Dashed route path */}
              <path
                d="M 150 300 Q 400 200 650 250"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Pickup Location */}
            <div className="absolute left-[15%] top-[65%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-200">
                    <div className="text-xs font-semibold text-gray-900">{selectedLoad.origin}</div>
                    <div className="text-xs text-gray-500">Pickup</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Delivery Location */}
            <div className="absolute right-[15%] top-[55%] transform translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-200">
                    <div className="text-xs font-semibold text-gray-900">{selectedLoad.destination}</div>
                    <div className="text-xs text-gray-500">Delivery</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Distance Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                <div className="text-xs text-gray-500">Total Distance</div>
                <div className="text-lg font-bold text-gray-900">{formatDistance(selectedLoad.distance)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-headline font-semibold text-foreground">Route Information</h3>
              <div className="text-2xl font-headline font-bold text-primary">
                {formatCurrency(selectedLoad.payment)}
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-primary mt-1" strokeWidth={1.5} />
                  <div>
                    <div className="text-sm text-muted-foreground">Pickup Location</div>
                    <div className="font-medium text-foreground">{selectedLoad.origin}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground mt-1" strokeWidth={1.5} />
                  <div>
                    <div className="text-sm text-muted-foreground">Pickup Date</div>
                    <div className="font-medium text-foreground">
                      {new Date(selectedLoad.pickupDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-success mt-1" strokeWidth={1.5} />
                  <div>
                    <div className="text-sm text-muted-foreground">Delivery Location</div>
                    <div className="font-medium text-foreground">{selectedLoad.destination}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CalendarIcon className="w-5 h-5 text-muted-foreground mt-1" strokeWidth={1.5} />
                  <div>
                    <div className="text-sm text-muted-foreground">Delivery Date</div>
                    <div className="font-medium text-foreground">
                      {new Date(selectedLoad.deliveryDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <RulerIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-muted-foreground">Distance</div>
                  <div className="text-lg font-semibold text-foreground">{formatDistance(selectedLoad.distance)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <WeightIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="text-lg font-semibold text-foreground">{formatWeight(selectedLoad.weight)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <ClockIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <div>
                  <div className="text-sm text-muted-foreground">ETA</div>
                  <div className="text-lg font-semibold text-foreground">
                    {Math.ceil(selectedLoad.distance / 60)} hrs
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setSelectedLoad(null)}
              className="flex-1 bg-background text-foreground border-border hover:bg-muted hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              onClick={handleTakeLoad}
              className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all ease-in duration-150"
            >
              Take Load
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
