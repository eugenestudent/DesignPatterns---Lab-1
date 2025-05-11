import { ShapeType } from '../repositories/ShapeRepository';
import { Comparator } from '../comparators/ComporatorInterface';

export class NameComparator implements Comparator {
  compare(a: ShapeType, b: ShapeType): number {
    return a.name.localeCompare(b.name);
  }
}