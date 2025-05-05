import { Point } from '../models/Point';

export class TetrahedronValidator {
  validate(points: Point[]): [Point, Point, Point, Point] {
    if (points.length !== 4) {
      throw new Error('Tetrahedron must have 4 points');
    }
    return [points[0], points[1], points[2], points[3]];
  }

  validateRaw(line: string): [Point, Point, Point, Point] {
    const parts = line.trim().split(/\s+/);
    if (parts.length !== 12 || parts.some(v => isNaN(Number(v)))) {
      throw new Error('Invalid tetrahedron data');
    }

    const points: Point[] = [];
    for (let i = 0; i < 12; i += 3) {
      points.push(new Point(Number(parts[i]), Number(parts[i + 1]), Number(parts[i + 2])));
    }
    return this.validate(points);
  }
}