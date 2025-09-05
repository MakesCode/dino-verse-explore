import { useDispatch, useSelector } from 'react-redux';
import { toast ,  } from '../../../../packages/component/ui/use-toast';
import { Toaster as Sonner, ToasterProps } from 'sonner';
import React from 'react';
import { notificationClosed } from '../../features/common/notify/notify.action';
import { selectNotify } from '../../features/common/notify/notify.selector';
import { useTheme } from 'next-themes';

export function NotificationProvider() {
  const { isOpen, message } = useSelector(selectNotify);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isOpen && message) {
      toast(message, {
        onDismiss: () => dispatch(notificationClosed()),
        onAutoClose: () => dispatch(notificationClosed()),
        duration: 5000,
        position: 'top-right',
      });
    }
  }, [isOpen, message, dispatch]);

  return <Toaster richColors closeButton position="top-right" />;
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          // toast:
          //   'group toast group-[.toaster]:!bg-background group-[.toaster]:!text-foreground group-[.toaster]:!border-border group-[.toaster]:!shadow-lg',
          // description: 'group-[.toast]:!text-muted-foreground',
          // actionButton: 'group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground',
          // cancelButton: 'group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground',
          // success: 'group-[.toast]:!bg-success group-[.toast]:!text-success-foreground',
          // error: '!border-none !bg-toast-error !text-foreground',
          // info: 'group-[.toast]:!bg-info group-[.toast]:!text-info-foreground',
          // warning: 'group-[.toast]:!bg-warning group-[.toast]:!text-warning-foreground',
          // closeButton: 'group-[.toaster]:!bg-background group-[.toast]:!text-muted-foreground',
          error: '!border-none !bg-toast-error !text-foreground',
          info: '!border-none !bg-toast-info !text-foreground',
          loading: '!border-none !bg-toast-loading !text-foreground',
          success: '!border-none !bg-toast-success !text-foreground',
          warning: '!border-none !bg-toast-warning !text-foreground',
        },
      }}
      {...props}
    />
  );
};