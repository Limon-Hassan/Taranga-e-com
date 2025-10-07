'use client';
import { SnackbarProvider } from 'notistack';

export default function ClientProvider({ children }) {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      {children}
    </SnackbarProvider>
  );
}
