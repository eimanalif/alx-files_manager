import { createClient } from 'redis';

class RedisClient {
  constructor() {
    /* Create a Redis client instance */
    this.client = createClient();

    /* Listen for errors and log them to the console */
    this.client.on('error', (err) => {
      console.error(`Redis client not connected to the server: ${err.message}`);
    });

    /* Log a message when the client successfully connects to the Redis server */
    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });
  }

  /* Check if the Redis client is connected */
  isAlive() {
    return this.client.connected;
  }

  /* Asynchronously retrieve the value associated with a key from Redis */
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(value); // Resolve the promise with the retrieved value
        }
      });
    });
  }

  /* Asynchronously store a key-value pair in Redis with an expiration time */
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, res) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(res); // Resolve the promise with the result of the operation
        }
      });
    });
  }

  /* Asynchronously delete a key-value pair from Redis*/
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, res) => {
        if (err) {
          reject(err); // Reject the promise if there's an error
        } else {
          resolve(res); // Resolve the promise with the result of the operation
        }
      });
    });
  }
}

/* Create and export an instance of the RedisClient class */
const redisClient = new RedisClient();
export default redisClient;
