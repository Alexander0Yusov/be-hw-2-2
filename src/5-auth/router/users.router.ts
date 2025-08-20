import { Router } from 'express';
import { errorsCatchMiddleware } from '../../core/middlewares/validation/errors-catch.middleware';
import { authDtoValidationMiddleware } from '../validation/auth-dto-validation.middleware';
import { postAuthHandler } from './handlers/post-auth.handler';

export const authRouter = Router({});

authRouter.post(
  '/login',
  authDtoValidationMiddleware,
  errorsCatchMiddleware,
  postAuthHandler,
);
