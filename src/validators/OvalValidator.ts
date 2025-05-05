import ValidationException from '../exceptions/ValidationException';
import { Point } from '../models/Point';

export class OvalValidator {
  validate(points: Point[]): [Point, Point] {
    if (points.length !== 2) {
      throw new ValidationException('Oval must have exactly 2 points');
    }
    if (points.some(p => p.x < 0 || p.y < 0)) {
      throw new ValidationException('Oval points must be non-negative');
    }

    const [p1, p2] = points;

    if (p1.x === p2.x || p1.y === p2.y) {
      throw new ValidationException('Points must not lie on a line parallel to coordinate axes');
    }

    return [p1, p2];
  }

  validateRaw(line: string): [Point, Point] {
    const parts = line.trim().split(/\s+/);
    if (parts.length !== 4 || parts.some(v => isNaN(Number(v)))) {
      throw new ValidationException('Invalid oval data');
    }

    const [x1, y1, x2, y2] = parts.map(Number);
    return this.validate([
      new Point(x1, y1),
      new Point(x2, y2),
    ]);
  }
}