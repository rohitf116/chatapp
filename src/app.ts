import express, { Express } from "express";
import { ChatServer } from "./setupServer";
import databaseConnection from "./setupDatabase";
class Application {
  public initialize(): void {
    databaseConnection();
    const app: Express = express();
    const server: ChatServer = new ChatServer(app);
    server.start();
  }
}
const application: Application = new Application();
application.initialize();
