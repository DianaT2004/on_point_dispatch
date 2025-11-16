import { useState, useEffect } from 'react';

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

let toastCount = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = ({
    title,
    description,
    variant = 'default',
    action,
  }: Omit<ToastProps, 'id'>) => {
    const id = `toast-${toastCount++}`;
    const newToast: ToastProps = {
      id,
      title,
      description,
      variant,
      action,
    };

    setToasts((currentToasts) => [...currentToasts, newToast]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((t) => t.id !== id));
    }, 5000);

    return id;
  };

  const dismiss = (toastId: string) => {
    setToasts((currentToasts) => currentToasts.filter((t) => t.id !== toastId));
  };

  return { toasts, toast, dismiss };
}
