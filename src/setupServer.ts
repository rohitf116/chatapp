import {
  Application,
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import cookieSession from "cookie-session";
import compression from "compression";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";
import { config } from "./config";
const SERVER_PORT = 5000;
export class ChatServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }
  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routeMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application) {
    app.use(
      cookieSession({
        name: "session",
        keys: [config.SECRET_KET_ONE!, config.SECRET_KET_ONE!],
        maxAge: 60 * 60 * 60 * 1000 * 60,
        secure: false,
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }
  private standardMiddleware(app: Application) {
    app.use(compression());
    app.use(json({ limit: "30mb" }));
    app.use(urlencoded({ extended: true, limit: "30mb" }));
  }
  private routeMiddleware(app: Application) {}
  private globalErrorHandler(app: Application) {}

  private startServer(app: Application): void {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }

  private createSocketIo(httpServer: http.Server): void {}
  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () =>
      console.log(`server running on port :${SERVER_PORT}`)
    );
  }
}
