import 'dotenv/config';
import { createClient } from 'redis';

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT || 6379,
    }
});

console.log("Connecting to Redis\n", 'REDIS_HOST:', process.env.REDIS_HOST, 'REDIS_PORT:', process.env.REDIS_PORT);

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();

    await client.set('foo', 'bar');
    const value = await client.get('foo');
    console.log(value); // returns 'bar'

    await client.disconnect();
})();
