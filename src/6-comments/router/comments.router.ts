import { Router } from 'express';
import { idValidationMiddleware } from '../../core/middlewares/validation/id-validation.middleware';
import { errorsCatchMiddleware } from '../../core/middlewares/validation/errors-catch.middleware';
import { getCommentHandler } from './handlers';

export const commentsRouter = Router({});

commentsRouter.get('/:id', idValidationMiddleware, errorsCatchMiddleware, getCommentHandler);

// .put(
//   '/:id',
//   superAdminGuardMiddleware,
//   idValidationMiddleware,
//   commentDtoValidationMiddleware,
//   errorsCatchMiddleware,
//   putPostHandler,
// )

// .delete('/:id', superAdminGuardMiddleware, idValidationMiddleware, errorsCatchMiddleware, deletePostHandler);
