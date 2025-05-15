import app from './app';
import { createServer } from 'http';

const server = createServer(app);

server.listen(3000, '0.0.0.0', () => { // Explicitly listen on all interfaces
  console.log(`Server running on http://localhost:3000`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});