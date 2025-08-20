import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { usersQwRepository } from '../../../4-users/qw-repository/users-qw-repository';
import { AuthInputModel } from '../../types/auth-iput-model';
import bcrypt from 'bcrypt';

export async function postAuthHandler(
  req: Request<{}, {}, AuthInputModel>,
  res: Response,
) {
  try {
    const existsUserId = await usersQwRepository.findByEmailOrLogin(
      req.body.loginOrEmail,
    );

    if (!existsUserId) {
      res.sendStatus(HttpStatus.Unauthorized);
    }

    const existsHash = await usersQwRepository.findHashById(
      existsUserId as string,
    );

    const match = await bcrypt.compare(req.body.password, existsHash);

    if (match) {
      res.sendStatus(HttpStatus.NoContent);
    } else {
      res.sendStatus(HttpStatus.Unauthorized);
    }
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
