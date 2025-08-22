import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';

import { commentsService } from '../../../6-comments/application/comments.service';

export async function getCommentListHandler(req: Request, res: Response) {
  try {
    const queryData = matchedData(req, { locations: ['query'] });
    const queryInput = setDefaultSortAndPaginationIfNotExist(queryData);

    const postId = req.params.id;

    const comments = await commentsService.findManyByPostId(postId, queryInput as any);

    res.status(HttpStatus.Ok).send(comments);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
