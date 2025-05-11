import { ShapeType } from '../repositories/ShapeRepository';
import { Comparator } from '../comparators/ComporatorInterface';

export class XCoordinateComparator implements Comparator {
  compare(a: ShapeType, b: ShapeType): number {
    return a.points[0].x - b.points[0].x;
  }
}

export class YCoordinateComparator implements Comparator {
  compare(a: ShapeType, b: ShapeType): number {
    return a.points[0].y - b.points[0].y;
  }
}