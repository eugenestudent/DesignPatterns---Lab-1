import BaseException from './BaseException';

export default class ValidationException extends BaseException {
  constructor(message: string) {
    super(`Validation error: ${message}`);
  }
}