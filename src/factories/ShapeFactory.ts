import { Point } from '../models/Point';
import { Shape } from '../models/Shape';
import { Oval } from '../models/Oval';
import { Tetrahedron } from '../models/Tetrahedron';

export interface ShapeFactory {
  createShape(id: string, points: Point[]): Shape;
}

export class OvalFactory implements ShapeFactory {
  createShape(id: string, points: Point[]): Oval {
    return new Oval(id, points as [Point, Point]);
  }
}

export class TetrahedronFactory implements ShapeFactory {
  createShape(id: string, points: Point[]): Tetrahedron {
    return new Tetrahedron(id, points as [Point, Point, Point, Point]);
  }
}