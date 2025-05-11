import { Point } from './Point';
import { ShapeObserver } from '../observers/ShapeObserver';

export abstract class Shape {
  protected observers: ShapeObserver[] = [];

  constructor(
    public id: string,
    public name: string,
    public points: Point[]
  ) {}

  addObserver(observer: ShapeObserver): void {
    this.observers.push(observer);
  }

  notifyObservers(): void {
    this.observers.forEach(o => o.update(this));
  }

  setPoints(points: Point[]): void {
    this.points = points;
    this.notifyObservers();
  }
  
  setPoint(index: number, point: Point): void {
    this.points[index] = point;
    this.notifyObservers();
  }
  
  setName(name: string): void {
    this.name = name;
    this.notifyObservers();
  }
}