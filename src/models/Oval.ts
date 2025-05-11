import { Shape } from './Shape';
import { Point } from './Point';
import { OvalService } from '../services/OvalService';
import { AreaCalculable, PerimeterCalculable } from './interfaces';

export class Oval extends Shape implements AreaCalculable, PerimeterCalculable {
  private ovalService: OvalService;

  constructor(
    public id: string,
    public name: string,
    public points: [Point, Point]
  ) {
    super(id, name, points);
    this.ovalService = new OvalService();
  }

  getArea(): number {
    return this.ovalService.calculateArea(this);
  }

  getPerimeter(): number {
    return this.ovalService.calculatePerimeter(this);
  }
  
}