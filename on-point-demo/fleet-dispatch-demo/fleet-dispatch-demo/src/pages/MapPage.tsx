import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPinIcon, NavigationIcon, TruckIcon } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8 h-[calc(100vh-5rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-foreground">Route Map</h1>
        <p className="text-muted-foreground mt-1">
          Current route with rest stops and services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-5rem)]">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="h-full overflow-hidden">
            <div className="relative w-full h-full bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1622088.4093447!2d-116.89!3d35.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!3m2!1d34.0522342!2d-118.2436849!4m5!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!3m2!1d36.1699412!2d-115.1398296!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Route Map"
              />
              
              {/* Overlay with current location */}
              <div className="absolute top-4 left-4 right-4">
                <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <TruckIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          Currently on route
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Los Angeles, CA → Las Vegas, NV
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <NavigationIcon className="w-4 h-4 mr-2" />
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
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Route Details
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Distance</div>
                <div className="text-2xl font-bold text-foreground">270 mi</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Estimated Time</div>
                <div className="text-2xl font-bold text-foreground">4h 15m</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Fuel Stops</div>
                <div className="text-2xl font-bold text-foreground">1 stop</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Upcoming Waypoints
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Pickup</div>
                  <div className="text-sm text-muted-foreground">
                    Los Angeles, CA
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    In 15 minutes
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Rest Stop</div>
                  <div className="text-sm text-muted-foreground">
                    Baker, CA
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    In 2 hours
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Delivery</div>
                  <div className="text-sm text-muted-foreground">
                    Las Vegas, NV
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    In 4 hours 15 min
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Nearby Services
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <TruckIcon className="w-4 h-4 mr-2" />
                Fuel (2.5 mi)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TruckIcon className="w-4 h-4 mr-2" />
                Rest Area (5.3 mi)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
