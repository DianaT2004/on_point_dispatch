import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { useServicesStore } from '../stores/servicesStore';
import {
  FuelIcon,
  WrenchIcon,
  TruckIcon,
  ParkingSquareIcon,
  FileCheckIcon,
  PhoneIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  SendIcon,
  LoaderIcon,
} from 'lucide-react';
import { Service } from '../data/mockData';

const serviceIcons = {
  fuel: FuelIcon,
  mechanic: WrenchIcon,
  towing: TruckIcon,
  parking: ParkingSquareIcon,
  permits: FileCheckIcon,
};

const serviceLabels = {
  fuel: 'Fuel Services',
  mechanic: 'Mechanic Services',
  towing: 'Towing Services',
  parking: 'Truck Parking',
  permits: 'Permits & Documentation',
};

export default function ServicesPage() {
  const { services, selectedService, setSelectedService, serviceRequest, requestService, isRequesting } = useServicesStore();
  const [activeTab, setActiveTab] = useState<Service['type']>('fuel');
  const [requestMessage, setRequestMessage] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const filteredServices = services.filter((s) => s.type === activeTab);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setRequestMessage(`Hi, I need ${service.type} service. I am currently at [Location]. Can you assist?`);
    setShowRequestModal(true);
  };

  const handleSendRequest = async () => {
    if (!selectedService) return;
    await requestService(selectedService, requestMessage);
  };

  const closeModal = () => {
    setShowRequestModal(false);
    setSelectedService(null);
    setRequestMessage('');
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Emergency Services</h1>
        <p className="text-muted-foreground mt-1">
          Quick access to nearby services
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Service['type'])}>
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="fuel" className="flex items-center gap-2">
            <FuelIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Fuel</span>
          </TabsTrigger>
          <TabsTrigger value="mechanic" className="flex items-center gap-2">
            <WrenchIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Mechanic</span>
          </TabsTrigger>
          <TabsTrigger value="towing" className="flex items-center gap-2">
            <TruckIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Towing</span>
          </TabsTrigger>
          <TabsTrigger value="parking" className="flex items-center gap-2">
            <ParkingSquareIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Parking</span>
          </TabsTrigger>
          <TabsTrigger value="permits" className="flex items-center gap-2">
            <FileCheckIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Permits</span>
          </TabsTrigger>
        </TabsList>

        {Object.keys(serviceIcons).map((type) => (
          <TabsContent key={type} value={type}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredServices.map((service) => {
                const Icon = serviceIcons[service.type];
                return (
                  <Card
                    key={service.id}
                    className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/50"
                    onClick={() => handleServiceClick(service)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {service.name}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span>{service.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" />
                            <span>{service.distance} mi</span>
                          </div>
                          {service.available247 && (
                            <div className="flex items-center gap-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>24/7</span>
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {service.address}
                        </p>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleServiceClick(service);
                            }}
                          >
                            <SendIcon className="w-4 h-4" />
                            Request Service
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `tel:${service.phone}`;
                            }}
                          >
                            <PhoneIcon className="w-4 h-4" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Service Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={closeModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Service</DialogTitle>
          </DialogHeader>

          {!serviceRequest && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Service Provider</Label>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  {selectedService && (
                    <>
                      {(() => {
                        const Icon = serviceIcons[selectedService.type];
                        return <Icon className="w-5 h-5 text-primary" />;
                      })()}
                      <div>
                        <div className="font-medium text-foreground">
                          {selectedService.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {selectedService.phone}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                  Message
                </Label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 border border-input rounded-md bg-background text-foreground"
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Describe your service needs..."
                />
              </div>

              <Button
                onClick={handleSendRequest}
                disabled={isRequesting || !requestMessage.trim()}
                className="w-full"
              >
                {isRequesting ? (
                  <>
                    <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <SendIcon className="w-4 h-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
            </div>
          )}

          {serviceRequest && (
            <div className="space-y-4">
              <div className="text-center py-6">
                {serviceRequest.status === 'drafting' && (
                  <>
                    <LoaderIcon className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                    <p className="text-lg font-medium text-foreground">
                      Drafting message with AI...
                    </p>
                  </>
                )}
                {serviceRequest.status === 'sending' && (
                  <>
                    <SendIcon className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                    <p className="text-lg font-medium text-foreground">
                      Sending request...
                    </p>
                  </>
                )}
                {serviceRequest.status === 'sent' && (
                  <>
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-foreground mb-2">
                      Request sent successfully!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {serviceRequest.service.name} will contact you shortly.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
