import { createClient } from 'redis';

const client = createClient({
  password: process.env.REDIS_KEY,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

client.on('error', (err) => {
  console.error('Error connecting to Redis Client >>> ', err)
});

if (!client.isOpen) {
  client.connect();
}

export { client };

