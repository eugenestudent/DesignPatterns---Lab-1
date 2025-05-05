import { BaseValidator } from './BaseValidator';
import { Point } from '../models/Point';

export class PointValidator extends BaseValidator<Point> {
  validate(data: unknown): Point {
    if (typeof data !== 'object' || data === null) {
      this.throwValidationError('Point must be an object');
    }

    const { x, y, z } = data as { x: number, y: number, z: number };
    
    if (typeof x !== 'number' || isNaN(x)) {
      this.throwValidationError('X coordinate must be a valid number');
    }

    if (typeof y !== 'number' || isNaN(y)) {
      this.throwValidationError('Y coordinate must be a valid number');
    }

    const zValue = typeof z === 'number' && !isNaN(z) ? z : 0;

    return new Point(x, y, zValue);
  }
}
