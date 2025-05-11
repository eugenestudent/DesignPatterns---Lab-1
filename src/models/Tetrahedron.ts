import { Shape } from './Shape';
import { Point } from './Point';
import { TetrahedronService } from '../services/TetrahedronService';
import { AreaCalculable, VolumeCalculable } from './interfaces';

export class Tetrahedron extends Shape implements AreaCalculable, VolumeCalculable {
  private tetrahedronService: TetrahedronService;

  constructor(
    public id: string,
    public name: string,
    public points: [Point, Point, Point, Point],
  ) {
    super(id, name, points);
    this.tetrahedronService = new TetrahedronService();
  }

  getArea(): number {
    return this.tetrahedronService.calculateSurfaceArea(this);
  }

  getVolume(): number {
    return this.tetrahedronService.calculateVolume(this);
  }
  
}