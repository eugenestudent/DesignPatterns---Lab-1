import { Shape } from '../models/Shape';
import { Oval } from '../models/Oval';

export class OvalService {
  calculateArea(shape: Shape): number {
    if (!(shape instanceof Oval)) {
      throw new Error('Invalid shape type');
    }

    const [point1, point2] = shape.points;
    const a = Math.abs(point2.x - point1.x);
    const b = Math.abs(point2.y - point1.y);

    const area = Math.PI * a * b;
    return parseFloat(area.toFixed(2));
  }

  calculatePerimeter(shape: Shape): number {
    if (!(shape instanceof Oval)) {
      throw new Error('Invalid shape type');
    }

    const [point1, point2] = shape.points;
    const a = Math.abs(point2.x - point1.x) / 2;
    const b = Math.abs(point2.y - point1.y) / 2;

    const perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
    return parseFloat(perimeter.toFixed(2));
  }
}