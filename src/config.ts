import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';
dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KET_ONE: string | undefined;
  public SECRET_KET_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public REDIS_PORT: string | undefined;
  public REDIS_PASSWORD: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || undefined;
    this.JWT_TOKEN = process.env.JWT_TOKEN || undefined;
    this.NODE_ENV = process.env.NODE_ENV || undefined;
    this.SECRET_KET_ONE = process.env.SECRET_KET_ONE || undefined;
    this.SECRET_KET_TWO = process.env.SECRET_KET_TWO || undefined;
    this.CLIENT_URL = process.env.CLIENT_URL || undefined;
    this.REDIS_HOST = process.env.REDIS_HOST || undefined;
    this.REDIS_PORT = process.env.REDIS_PORT || undefined;
    this.REDIS_PASSWORD = process.env.REDIS_PASSWORD || undefined;
    this.CLOUD_NAME = process.env.CLOUD_NAME || undefined;
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || undefined;
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || undefined;
  }
  public createLoger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, val] of Object.entries(this)) {
      if (val === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }

  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET
    });
  }
}

export const config: Config = new Config();
