import { Response, Router } from 'express';
import { errorsCatchMiddleware } from '../../core/middlewares/validation/errors-catch.middleware';
import { authDtoValidationMiddleware } from '../validation/auth-dto-validation.middleware';
import { postAuthHandler } from './handlers/post-auth.handler';
import { accessTokenGuard } from './guards/access.token.guard';
import { RequestWithUserId } from '../../core/types/requests';
import { IdType } from '../../core/types/id';
import { HttpStatus } from '../../core/types/HttpStatus';
import { usersQwRepository } from '../../4-users/qw-repository/users-qw-repository';

export const authRouter = Router({});

authRouter.post('/login', authDtoValidationMiddleware, errorsCatchMiddleware, postAuthHandler);

authRouter.get('/me', accessTokenGuard, async (req: RequestWithUserId<IdType>, res: Response) => {
  const userId = req.user?.id as string;

  if (!userId) return res.sendStatus(HttpStatus.Unauthorized);

  const me = await usersQwRepository.findById(userId);

  return res.status(HttpStatus.Ok).send({
    email: me?.email,
    login: me?.login,
    userId: me?.id,
  });
});
