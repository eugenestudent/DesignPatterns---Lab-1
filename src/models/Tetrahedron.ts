import { Shape } from './Shape';
import { Point } from './Point';

export class Tetrahedron extends Shape {
  constructor(
    id: string,
    points: [Point, Point, Point, Point]
  ) {
    super(id, points);
  }
}