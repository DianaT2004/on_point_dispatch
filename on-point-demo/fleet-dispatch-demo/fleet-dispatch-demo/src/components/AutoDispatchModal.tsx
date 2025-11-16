import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { useDispatchStore } from '../stores/dispatchStore';
import { CheckCircle2Icon, FileTextIcon } from 'lucide-react';

interface AutoDispatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AutoDispatchModal({ open, onOpenChange }: AutoDispatchModalProps) {
  const { isDispatching, currentStep, steps, bolData, startDispatch, nextStep, reset } = useDispatchStore();

  useEffect(() => {
    if (open && !isDispatching) {
      startDispatch('mock-load-id');
      
      const interval = setInterval(() => {
        nextStep();
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [open, isDispatching, startDispatch, nextStep]);

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isComplete = currentStep >= steps.length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-card text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-foreground">Auto-Dispatch</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              {isComplete ? 'Dispatch Complete' : `Step ${currentStep + 1} of ${steps.length}`}
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-lg transition-all ease-in duration-150 ${
                  index <= currentStep
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-muted border border-transparent'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle2Icon className="w-5 h-5 text-success" strokeWidth={1.5} />
                ) : (
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    index === currentStep ? 'border-primary animate-pulse' : 'border-muted-foreground'
                  }`} />
                )}
                <span className={`font-medium ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          {bolData && (
            <Card className="p-6 bg-muted space-y-4">
              <div className="flex items-center gap-3">
                <FileTextIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                <h3 className="text-lg font-headline font-semibold text-foreground">Bill of Lading</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Load ID:</span>
                  <span className="font-medium text-foreground">{bolData.loadId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipper:</span>
                  <span className="font-medium text-foreground">{bolData.shipper}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receiver:</span>
                  <span className="font-medium text-foreground">{bolData.receiver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items:</span>
                  <span className="font-medium text-foreground">{bolData.items}</span>
                </div>
              </div>
            </Card>
          )}

          {isComplete && (
            <Button
              onClick={handleClose}
              className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-all ease-in duration-150"
            >
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
