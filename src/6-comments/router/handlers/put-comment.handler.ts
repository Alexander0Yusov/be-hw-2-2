import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/HttpStatus';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { commentsService } from '../../application/comments.service';

export async function putCommentHandler(req: Request, res: Response) {
  try {
    const comment = await commentsService.findById(req.params.id);

    if (!comment) {
      res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Comment not found' }]));
      return;
    }

    await commentsService.update(req.params.id, req.body);

    res.sendStatus(HttpStatus.NoContent);
  } catch (error: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
