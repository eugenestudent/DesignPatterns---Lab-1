import { ShapeType } from '../repositories/ShapeRepository';

export interface Comparator {
  compare(a: ShapeType, b: ShapeType): number;
}