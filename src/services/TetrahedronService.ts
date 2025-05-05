import { Point } from '../models/Point';
import { Shape } from '../models/Shape';
import { Tetrahedron } from '../models/Tetrahedron';

export class TetrahedronService {
  calculateVolume(shape: Shape): number {
    if (!(shape instanceof Tetrahedron)) {
      throw new Error('Invalid shape type');
    }

    const [a, b, c, d] = shape.points;

    const ab = this.vector(b, a);
    const ac = this.vector(c, a);
    const ad = this.vector(d, a);

    const cross = this.crossProduct(ac, ad);
    const volume = Math.abs(this.dotProduct(ab, cross)) / 6;

    return this.round(volume);
  }

  calculateSurfaceArea(shape: Shape): number {
    if (!(shape instanceof Tetrahedron)) {
      throw new Error('Invalid shape type');
    }

    const [a, b, c, d] = shape.points;

    const triangles = [
      [a, b, c],
      [a, b, d],
      [a, c, d],
      [b, c, d],
    ];

    let area = 0;
    for (const [p1, p2, p3] of triangles) {
      const u = this.vector(p2, p1);
      const v = this.vector(p3, p1);
      const cross = this.crossProduct(u, v);
      const triangleArea = 0.5 * this.vectorLength(cross);
      area += triangleArea;
    }

    return this.round(area);
  }

  private vector(to: Point, from: Point): [number, number, number] {
    return [to.x - from.x, to.y - from.y, to.z - from.z];
  }

  private dotProduct(a: [number, number, number], b: [number, number, number]): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  private crossProduct(a: [number, number, number], b: [number, number, number]): [number, number, number] {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }

  private vectorLength(v: [number, number, number]): number {
    return Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}