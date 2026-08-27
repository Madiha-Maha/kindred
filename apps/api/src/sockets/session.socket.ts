import { Server } from 'socket.io';

export function registerSessionSocket(io: Server) {
  io.on('connection', (socket) => {
    socket.on('session:join', (sessionId: string) => socket.join(`session:${sessionId}`));
    socket.on('session:status', ({ sessionId, status }: { sessionId: string; status: string }) => {
      io.to(`session:${sessionId}`).emit('session:status', { sessionId, status });
    });
  });
}