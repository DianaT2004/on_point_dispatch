import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLoadsStore } from '../stores/loadsStore';
import { MapPinIcon, WeightIcon, RulerIcon, CalendarIcon, ClockIcon, TrophyIcon, CheckCircle2Icon } from 'lucide-react';
import { formatCurrency, formatDistance, formatWeight } from '../lib/utils';

export default function LoadDetailModal() {
  const { selectedLoad, setSelectedLoad, takeLoad } = useLoadsStore();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!selectedLoad) return null;

  const handleTakeLoad = async () => {
    setShowSuccess(true);
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    takeLoad(selectedLoad.id);
    setShowSuccess(false);
    setSelectedLoad(null);
  };

  return (
    <Dialog open={!!selectedLoad} onOpenChange={() => setSelectedLoad(null)}>
      <DialogContent className="max-w-full sm:max-w-2xl bg-card text-foreground max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-headline text-foreground">Load Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Enhanced Route Map with Textures */}
          <div className="aspect-video w-full bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-lg overflow-hidden relative border-2 border-border shadow-lg">
            {/* Textured Map Background */}
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 800 450">
                <defs>
                  {/* Grid Pattern */}
                  <pattern id="detailGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                    <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.2"/>
                  </pattern>
                  
                  {/* Road texture pattern */}
                  <pattern id="roadTexture" width="20" height="4" patternUnits="userSpaceOnUse">
                    <rect width="10" height="4" fill="#cbd5e1" opacity="0.3"/>
                    <rect x="10" width="10" height="4" fill="transparent"/>
                  </pattern>
                </defs>
                
                {/* Background */}
                <rect width="800" height="450" fill="url(#detailGrid)" className="text-gray-400" />
                
                {/* Terrain features */}
                <ellipse cx="250" cy="350" rx="80" ry="40" fill="#10b981" opacity="0.1"/>
                <ellipse cx="600" cy="200" rx="100" ry="50" fill="#3b82f6" opacity="0.08"/>
                <ellipse cx="400" cy="280" rx="120" ry="60" fill="#8b5cf6" opacity="0.06"/>
              </svg>
            </div>
            
            {/* Animated Route Line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450">
              <defs>
                <linearGradient id="detailRouteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                
                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Road base */}
              <path
                d="M 150 300 Q 300 250, 400 240 T 650 250"
                stroke="#94a3b8"
                strokeWidth="12"
                fill="none"
                opacity="0.3"
                strokeLinecap="round"
              />
              
              {/* Main route with texture */}
              <path
                d="M 150 300 Q 300 250, 400 240 T 650 250"
                stroke="url(#detailRouteGradient)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="15,10"
                strokeLinecap="round"
                filter="url(#glow)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            
            {/* Pickup Location */}
            <div className="absolute left-[15%] top-[65%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative animate-bounce">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white px-2 sm:px-3 py-1 rounded-lg shadow-xl border-2 border-blue-200">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900">{selectedLoad.origin}</div>
                    <div className="text-xs text-blue-600">Pickup</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Delivery Location */}
            <div className="absolute right-[15%] top-[55%] transform translate-x-1/2 -translate-y-1/2">
              <div className="relative animate-bounce" style={{ animationDelay: '0.3s' }}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                  <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white px-2 sm:px-3 py-1 rounded-lg shadow-xl border-2 border-green-200">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900">{selectedLoad.destination}</div>
                    <div className="text-xs text-green-600">Delivery</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Distance Badge */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
              <div className="bg-white/95 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg border border-gray-200">
                <div className="text-xs text-gray-500">Total Distance</div>
                <div className="text-base sm:text-lg font-bold text-gray-900">{formatDistance(selectedLoad.distance)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-headline font-semibold text-foreground">Route Information</h3>
              <div className="text-xl sm:text-2xl font-headline font-bold text-primary">
                {formatCurrency(selectedLoad.payment)}
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-1" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Pickup Location</div>
                    <div className="text-sm sm:text-base font-medium text-foreground">{selectedLoad.origin}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-1" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Pickup Date</div>
                    <div className="text-sm sm:text-base font-medium text-foreground">
                      {new Date(selectedLoad.pickupDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-success mt-1" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Delivery Location</div>
                    <div className="text-sm sm:text-base font-medium text-foreground">{selectedLoad.destination}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-1" strokeWidth={1.5} />
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Delivery Date</div>
                    <div className="text-sm sm:text-base font-medium text-foreground">
                      {new Date(selectedLoad.deliveryDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-muted rounded-lg">
                <RulerIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
                <div className="text-center sm:text-left">
                  <div className="text-xs text-muted-foreground">Distance</div>
                  <div className="text-sm sm:text-lg font-semibold text-foreground">{formatDistance(selectedLoad.distance)}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-muted rounded-lg">
                <WeightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
                <div className="text-center sm:text-left">
                  <div className="text-xs text-muted-foreground">Weight</div>
                  <div className="text-sm sm:text-lg font-semibold text-foreground">{formatWeight(selectedLoad.weight)}</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-muted rounded-lg">
                <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.5} />
                <div className="text-center sm:text-left">
                  <div className="text-xs text-muted-foreground">ETA</div>
                  <div className="text-sm sm:text-lg font-semibold text-foreground">
                    {Math.ceil(selectedLoad.distance / 60)} hrs
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setSelectedLoad(null)}
              className="flex-1 bg-background text-foreground border-border hover:bg-muted hover:text-foreground text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              onClick={handleTakeLoad}
              disabled={showSuccess}
              className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all ease-in duration-150 text-sm sm:text-base"
            >
              {showSuccess ? (
                <>
                  <CheckCircle2Icon className="w-4 h-4 mr-2 animate-bounce" />
                  Taking Load...
                </>
              ) : (
                'Take Load'
              )}
            </Button>
          </div>
        </div>

        {/* Success Award Animation Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-sm mx-4 animate-in zoom-in duration-300">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 animate-bounce shadow-lg">
                  <TrophyIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Load Accepted!</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Great choice! This load has been added to your active routes.
                </p>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle2Icon className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-medium">Processing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
