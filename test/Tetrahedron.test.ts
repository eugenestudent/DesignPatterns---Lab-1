import { Tetrahedron } from '../src/models/Tetrahedron';
import { Point } from '../src/models/Point';
import { TetrahedronService } from '../src/services/TetrahedronService';
import { TetrahedronValidator } from '../src/validators/TetrahedronValidator';

describe('Tetrahedron Service', () => {
  let tetrahedronService: TetrahedronService;
  let tetrahedronValidator: TetrahedronValidator;

  beforeEach(() => {
    tetrahedronService = new TetrahedronService();
    tetrahedronValidator = new TetrahedronValidator();
  });

  test('should correctly calculate volume of tetrahedron', () => {
    const points: [Point, Point, Point, Point] = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0.5, Math.sqrt(3) / 2, 0),
      new Point(0.5, Math.sqrt(3) / 6, Math.sqrt(6) / 3),
    ];

    const tetrahedron = new Tetrahedron('1', 'tetra1', points);

    const volume = tetrahedronService.calculateVolume(tetrahedron);
    expect(volume).toBeCloseTo(0.11785, 1);
  });

  test('should correctly calculate surface area of tetrahedron', () => {
    const points: [Point, Point, Point, Point] = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0.5, Math.sqrt(3) / 2, 0),
      new Point(0.5, Math.sqrt(3) / 6, Math.sqrt(6) / 3),
    ];

    const tetrahedron = new Tetrahedron('1','tetra1', points);

    const surfaceArea = tetrahedronService.calculateSurfaceArea(tetrahedron);
    expect(surfaceArea).toBeCloseTo(1.74, 1);
  });

  test('should throw error if tetrahedron points are invalid', () => {
    const points = [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 0, 0),
    ];

    expect(() => tetrahedronValidator.validate(points)).toThrowError('Tetrahedron must have 4 points');
  });
});
