import BaseException from './BaseException';

export default class FileException extends BaseException {
  constructor(message: string) {
    super(`File error: ${message}`);
  }
}