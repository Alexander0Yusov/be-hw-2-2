import { Router } from 'express';
import { idValidationMiddleware } from '../../core/middlewares/validation/id-validation.middleware';
import { errorsCatchMiddleware } from '../../core/middlewares/validation/errors-catch.middleware';
import { superAdminGuardMiddleware } from '../../core/middlewares/validation/super-admin-guard.middleware';
import { postDtoValidationMiddleware } from '../validation/post-dto-validation.middleware';
import {
  deletePostHandler,
  getPostHandler,
  getPostListHandler,
  postPostHandler,
  putPostHandler,
} from './handlers';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation-middleware';
import { PostSortField } from './input/post-sort-field';

export const postsRouter = Router({});

postsRouter
  .get(
    '',
    paginationAndSortingValidation(PostSortField),
    // errorsCatchMiddleware,
    getPostListHandler,
  )

  .post(
    '',
    superAdminGuardMiddleware,
    postDtoValidationMiddleware,
    errorsCatchMiddleware,
    postPostHandler,
  )

  .get('/:id', idValidationMiddleware, errorsCatchMiddleware, getPostHandler)

  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidationMiddleware,
    postDtoValidationMiddleware,
    errorsCatchMiddleware,
    putPostHandler,
  )

  .delete(
    '/:id',
    superAdminGuardMiddleware,
    idValidationMiddleware,
    errorsCatchMiddleware,
    deletePostHandler,
  );
