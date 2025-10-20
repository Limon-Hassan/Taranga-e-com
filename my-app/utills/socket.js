'use client';

import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SERVER_PORT, {
  transports: ['websocket'],
  withCredentials: true,
});

socket.on('connect', () => {
  console.log('✅ Connected to socket server:', socket.id);
});

socket.on('connect_error', err => {
  console.error('❌ Socket connection error:', err.message);
});

export default socket;
