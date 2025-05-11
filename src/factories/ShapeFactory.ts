import { Point } from '../models/Point';
import { Shape } from '../models/Shape';
import { Oval } from '../models/Oval';
import { Tetrahedron } from '../models/Tetrahedron';

export interface ShapeFactory {
  createShape(name: string, points: Point[]): Shape;
}

// ID Generator
export class IdGenerator {
  private static instance: IdGenerator;
  private currentId: number = 0;
  
  private constructor() {}
  
  public static getInstance(): IdGenerator {
    if (!IdGenerator.instance) {
      IdGenerator.instance = new IdGenerator();
    }
    return IdGenerator.instance;
  }
  
  public getNextId(): string {
    this.currentId += 1;
    return this.currentId.toString();
  }
  
}

export class OvalFactory implements ShapeFactory {
  createShape(name: string, points: Point[]): Oval {
    const id = IdGenerator.getInstance().getNextId();
    return new Oval(id, name, points as [Point, Point]);
  }
}

export class TetrahedronFactory implements ShapeFactory {
  createShape(name: string, points: Point[]): Tetrahedron {
    const id = IdGenerator.getInstance().getNextId();
    return new Tetrahedron(id, name, points as [Point, Point, Point, Point]);
  }
}