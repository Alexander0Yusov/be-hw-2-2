import { ResultStatus } from './resultCode';
import { HttpStatus } from '../types/HttpStatus';

export const resultCodeToHttpException = (resultCode: ResultStatus): number => {
  switch (resultCode) {
    case ResultStatus.BadRequest:
      return HttpStatus.BadRequest;
    case ResultStatus.Forbidden:
      return HttpStatus.Forbidden;
    default:
      return HttpStatus.InternalServerError;
  }
};
