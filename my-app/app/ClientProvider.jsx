'use client';
import { SnackbarProvider } from 'notistack';
import { SocketContext } from '../utills/socketContext';
import socket from '../utills/socket';

export default function ClientProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        {children}
      </SnackbarProvider>
    </SocketContext.Provider>
  );
}
