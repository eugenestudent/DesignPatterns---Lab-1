import { Oval } from '../models/Oval';
import { Tetrahedron } from '../models/Tetrahedron';
import { Specification } from '../specifications/Specification';
import { Comparator } from '../comparators/ComporatorInterface';
import logger from '../utils/logger';

export type ShapeType = Oval | Tetrahedron;

export class ShapeRepository {
  private static instance: ShapeRepository | null = null;
  private shapes: Map<string, ShapeType> = new Map();

  private constructor() {}

  static getInstance(): ShapeRepository {
    if (!ShapeRepository.instance) {
      ShapeRepository.instance = new ShapeRepository();
      logger.info('ShapeRepository instance created');
    }
    return ShapeRepository.instance;
  }

  add(shape: ShapeType): void {
    if (this.shapes.has(shape.id)) {
      logger.warn(`Shape with id ${shape.id} already exists. Updating.`);
    }
    this.shapes.set(shape.id, shape);
    logger.info(`Added shape ${shape.id} to repository`);
  }

  removeById(id: string): boolean {
    const result = this.shapes.delete(id);
    if (result) {
      logger.info(`Removed shape ${id} from repository`);
    } else {
      logger.warn(`Shape ${id} not found in repository`);
    }
    return result;
  }

  getById(id: string): ShapeType | undefined {
    return this.shapes.get(id);
  }

  getAll(): ShapeType[] {
    return Array.from(this.shapes.values());
  }

  find(specification: Specification<ShapeType>): ShapeType[] {
    return this.getAll().filter(shape => specification.isSatisfiedBy(shape));
  }

  sort(comparator: Comparator): ShapeType[] {
    return [...this.shapes.values()].sort((a, b) => comparator.compare(a, b));
  }
  
  clear(): void {
    this.shapes.clear();
    logger.info('Repository cleared');
  }
  
  count(): number {
    return this.shapes.size;
  }
  
  exists(id: string): boolean {
    return this.shapes.has(id);
  }
}