import { Notification } from '@arco-design/web-react';

type ToastVariant = 'default' | 'success' | 'warning' | 'destructive';

interface ToastOptions {
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
}

function getNotificationType(variant?: ToastVariant): 'info' | 'success' | 'warning' | 'error' {
  switch (variant) {
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'destructive':
      return 'error';
    default:
      return 'info';
  }
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const { variant = 'default', title, description, duration = 3000 } = options;
    const type = getNotificationType(variant);
    const content = description || title || '';
    
    Notification[type]({
      title: title || '',
      content: content,
      duration: duration,
    });
  };

  return { toast };
}
