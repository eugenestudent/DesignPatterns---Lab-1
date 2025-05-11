import { Specification } from './Specification';
import { ShapeType } from '../repositories/ShapeRepository';
import { Point } from '../models/Point';

export class DistanceRangeSpecification implements Specification<ShapeType> {
  private origin = new Point(0, 0, 0);

  constructor(private minDistance: number, private maxDistance: number) {}

  private calculateDistance(point: Point): number {
    const dx = this.origin.x - point.x;
    const dy = this.origin.y - point.y;
    const dz = this.origin.z - point.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  isSatisfiedBy(item: ShapeType): boolean {
    return item.points.some(point => {
      const distance = this.calculateDistance(point);
      return distance >= this.minDistance && distance <= this.maxDistance;
    });
  }
}