'use client';
import { SnackbarProvider } from 'notistack';
import { SocketContext } from '../utills/socketContext';
import socket from '../utills/socket';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof fbq === 'function') {
      fbq('track', 'PageView');
    }
  }, [pathname]);
  return (
    <SocketContext.Provider value={socket}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={3}
        autoHideDuration={3000}
      >
        {children}
      </SnackbarProvider>
    </SocketContext.Provider>
  );
}
