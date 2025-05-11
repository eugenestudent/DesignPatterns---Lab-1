import { ShapeType } from '../repositories/ShapeRepository';
import { Comparator } from '../comparators/ComporatorInterface';

export class IdComparator implements Comparator {
  compare(a: ShapeType, b: ShapeType): number {
    return a.id.localeCompare(b.id);
  }
}
