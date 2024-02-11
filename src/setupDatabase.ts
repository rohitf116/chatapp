import Logger from 'bunyan';
import { config } from '@root/config';
import mongoose from 'mongoose';
const log: Logger = config.createLoger('databaseSetupt');
const MONGO_URI = config.DATABASE_URL;
export default () => {
  const connect = () => {
    mongoose
      .connect(MONGO_URI!)
      .then(() => log.info('connected to mongodb'))
      .catch((err) => {
        log.error(err);

        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on('disconnect', connect);
};
