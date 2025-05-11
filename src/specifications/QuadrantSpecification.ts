import { Specification } from './Specification';
import { ShapeType } from '../repositories/ShapeRepository';
import { Point } from '../models/Point';

export class QuadrantSpecification implements Specification<ShapeType> {
  constructor(private quadrant: 1 | 2 | 3 | 4) {}

  private isPointInQuadrant(point: Point): boolean {
    switch (this.quadrant) {
      case 1:
        return point.x > 0 && point.y > 0;
      case 2:
        return point.x < 0 && point.y > 0;
      case 3:
        return point.x < 0 && point.y < 0;
      case 4:
        return point.x > 0 && point.y < 0;
      default:
        return false;
    }
  }

  isSatisfiedBy(item: ShapeType): boolean {
    return item.points.every(point => this.isPointInQuadrant(point));
  }
}