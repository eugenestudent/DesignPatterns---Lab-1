import ValidationException from '../exceptions/ValidationException';

export abstract class BaseValidator<T> {
  protected throwValidationError(message: string): never {
    throw new ValidationException(message);
  }

  abstract validate(data: unknown): T;
}