import { SignUp } from '@auth/controllers/signup';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    console.log({ rou: this.router });
  }

  public routes(): Router {
    this.router.post('/signup', SignUp.prototype.create);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
