import { Specification } from './Specification';
import { ShapeType } from '../repositories/ShapeRepository';

export class IdSpecification implements Specification<ShapeType> {
  constructor(private id: string) {}

  isSatisfiedBy(item: ShapeType): boolean {
    return item.id === this.id;
  }
}