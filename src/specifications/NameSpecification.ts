import { Specification } from './Specification';
import { ShapeType } from '../repositories/ShapeRepository';

export class NameSpecification implements Specification<ShapeType> {
  constructor(private name: string) {}

  isSatisfiedBy(item: ShapeType): boolean {
    return item.name === this.name;
  }
}