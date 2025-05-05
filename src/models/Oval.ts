import { Shape } from './Shape';
import { Point } from './Point';

export class Oval extends Shape {
  constructor(
    id: string,
    points: [Point, Point]
  ) {
    super(id, points);
  }
}