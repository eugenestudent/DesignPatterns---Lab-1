import { OvalService } from '../services/OvalService';
import { TetrahedronService } from '../services/TetrahedronService';
import { Shape } from '../models/Shape';

export class ShapeServiceFactory {
  static createService(shape: Shape) {
    if (shape instanceof Shape && shape.constructor.name === 'Oval') {
      const ovalService = new OvalService();
      return ovalService;
    }
    if (shape instanceof Shape && shape.constructor.name === 'Tetrahedron') {
      const tetrahedronService = new TetrahedronService();
      return tetrahedronService;
    }
    throw new Error('Unsupported shape');
  }
}