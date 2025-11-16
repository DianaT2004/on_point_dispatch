import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPinIcon, NavigationIcon, TruckIcon, FuelIcon, ClockIcon } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8 min-h-[calc(100vh-5rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-foreground">Route Map</h1>
        <p className="text-muted-foreground mt-1">
          Current route with rest stops and services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[600px]">
        {/* Map */}
        <div className="lg:col-span-2 h-[500px] lg:h-auto">
          <Card className="h-full overflow-hidden">
            <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
              {/* Map Background with Texture */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 1200 800">
                  <defs>
                    <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      <circle cx="25" cy="25" r="1" fill="currentColor" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="1200" height="800" fill="url(#mapGrid)" className="text-gray-400" />
                </svg>
              </div>

              {/* Route Path with Animation */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
                <defs>
                  <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6">
                      <animate attributeName="stop-color" values="#3b82f6; #8b5cf6; #3b82f6" dur="3s" repeatCount="indefinite"/>
                    </stop>
                    <stop offset="100%" stopColor="#8b5cf6">
                      <animate attributeName="stop-color" values="#8b5cf6; #3b82f6; #8b5cf6" dur="3s" repeatCount="indefinite"/>
                    </stop>
                  </linearGradient>
                  
                  {/* Animated Truck */}
                  <path id="routePath" d="M 200 600 Q 350 450, 500 500 T 900 400" fill="none"/>
                </defs>
                
                {/* Main Route */}
                <path
                  d="M 200 600 Q 350 450, 500 500 T 900 400"
                  stroke="url(#routeGrad)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="15,10"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                
                {/* Animated moving dot */}
                <circle r="8" fill="#3b82f6" className="drop-shadow-lg">
                  <animateMotion dur="6s" repeatCount="indefinite">
                    <mpath href="#routePath"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite"/>
                </circle>
              </svg>

              {/* Tbilisi - Pickup */}
              <div className="absolute left-[15%] top-[75%] transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-10 lg:-bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white/95 backdrop-blur-sm px-2 py-1 lg:px-4 lg:py-2 rounded-xl shadow-2xl border-2 border-blue-200">
                      <div className="text-xs lg:text-sm font-bold text-gray-900">Tbilisi</div>
                      <div className="text-xs text-blue-600">Pickup</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rest Stop - Gori */}
              <div className="absolute left-[42%] top-[62%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-yellow-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center animate-pulse">
                    <FuelIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-8 lg:-bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 lg:px-3 lg:py-1 rounded-lg shadow-xl border border-yellow-200">
                      <div className="text-xs font-semibold text-gray-900">Gori</div>
                      <div className="text-xs text-yellow-600">Rest</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Batumi - Delivery */}
              <div className="absolute right-[10%] top-[50%] transform translate-x-1/2 -translate-y-1/2 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-10 lg:-bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white/95 backdrop-blur-sm px-2 py-1 lg:px-4 lg:py-2 rounded-xl shadow-2xl border-2 border-green-200">
                      <div className="text-xs lg:text-sm font-bold text-gray-900">Batumi</div>
                      <div className="text-xs text-green-600">Delivery</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Location Badge with Truck */}
              <div className="absolute top-4 left-4 right-4">
                <Card className="p-3 lg:p-4 bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-primary/20">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <TruckIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs lg:text-sm font-bold text-foreground">En Route</div>
                        <div className="text-xs text-muted-foreground">Tbilisi → Batumi</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-xs lg:text-sm">
                      <NavigationIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                      Navigate
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>

        {/* Route Details */}
        <div className="space-y-4 overflow-y-auto">
          <Card className="p-4 lg:p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <ClockIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
              Route Details
            </h3>
            <div className="space-y-3 lg:space-y-4">
              <div>
                <div className="text-xs lg:text-sm text-muted-foreground mb-1">Distance</div>
                <div className="text-2xl lg:text-3xl font-bold text-primary">380 km</div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-muted-foreground mb-1">Estimated Time</div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground">6h 20m</div>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-muted-foreground mb-1">Fuel Stops</div>
                <div className="text-2xl lg:text-3xl font-bold text-green-600">1 stop</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 lg:p-6 border-2 border-border">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4">
              Upcoming Waypoints
            </h3>
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 bg-blue-50 rounded-lg border border-blue-200 transition-all hover:shadow-md">
                <MapPinIcon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm lg:text-base font-medium text-foreground">Pickup</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Tbilisi, Georgia</div>
                  <div className="text-xs text-blue-600 mt-1 font-semibold">In 15 minutes</div>
                </div>
              </div>

              <div className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 bg-yellow-50 rounded-lg border border-yellow-200 transition-all hover:shadow-md">
                <FuelIcon className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm lg:text-base font-medium text-foreground">Rest Stop</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Gori, Georgia</div>
                  <div className="text-xs text-yellow-600 mt-1 font-semibold">In 3 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 bg-green-50 rounded-lg border border-green-200 transition-all hover:shadow-md">
                <MapPinIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm lg:text-base font-medium text-foreground">Delivery</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Batumi, Georgia</div>
                  <div className="text-xs text-green-600 mt-1 font-semibold">In 6 hours 20 min</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 lg:p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100">
            <h3 className="text-base lg:text-lg font-semibold text-foreground mb-4">
              Nearby Services
            </h3>
            <div className="space-y-2 lg:space-y-3">
              <Button variant="outline" className="w-full justify-start hover:bg-purple-50 border-purple-200 text-xs lg:text-sm">
                <FuelIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-2 text-purple-600" />
                RapidFuel - 2.5 km away
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-blue-50 border-blue-200 text-xs lg:text-sm">
                <TruckIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-2 text-blue-600" />
                Rest Area - 5.3 km away
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
