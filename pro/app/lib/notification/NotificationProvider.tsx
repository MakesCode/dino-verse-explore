import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from '@sg/ui';
import React from 'react';
import { notificationClosed } from '../../features/common/notify/notify.action';
import { selectNotify } from '../../features/common/notify/notify.selector';

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
