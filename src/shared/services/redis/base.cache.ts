import { config } from '@root/config';
import Logger from 'bunyan';
import { createClient } from 'redis';

export type RedisClient = ReturnType<typeof createClient>;

export abstract class BaseCache {
  client: RedisClient;
  log: Logger;
  constructor(cacheName: string) {
    this.client = createClient({
      password: config.REDIS_PASSWORD,
      socket: {
        host: config.REDIS_HOST,
        port: Number(config.REDIS_PORT)
      }
    });
    this.log = config.createLoger(cacheName);
  }

  private cacheError(): void {
    this.client.on('error', (error: unknown) => {
      this.log.error(error);
    });
  }
}
