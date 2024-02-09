import { config } from "./config";
import mongoose from "mongoose";

const MONGO_URI = config.DATABASE_URL;
export default () => {
  const connect = () => {
    mongoose
      .connect(MONGO_URI!)
      .then(() => console.log("connected to mongodb"))
      .catch((err) => {
        console.log(err);

        return process.exit(1);
      });
  };
  connect();
  mongoose.connection.on("disconnect", connect);
};
