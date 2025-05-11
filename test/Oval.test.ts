import { Oval } from '../src/models/Oval';
import { Point } from '../src/models/Point';
import { OvalService } from '../src/services/OvalService';
import { OvalValidator } from '../src/validators/OvalValidator';

describe('Oval Service', () => {
  let ovalService: OvalService;
  let ovalValidator: OvalValidator;

  beforeEach(() => {
    ovalService = new OvalService();
    ovalValidator = new OvalValidator();
  });

  test('should correctly calculate area of oval', () => {
    const pointA = new Point(4, 6);
    const pointB = new Point(0, 0);
    const oval = new Oval('1','oval1', [pointA, pointB]);

    const area = ovalService.calculateArea(oval);
    expect(area).toBeCloseTo(Math.PI * 4 * 6, 2);
  });

  test('should correctly calculate perimeter of oval', () => {
    const pointA = new Point(4, 6);
    const pointB = new Point(0, 0);
    const oval = new Oval('1','oval1', [pointA, pointB]);
  
    const a = Math.abs(pointA.x - pointB.x) / 2;
    const b = Math.abs(pointA.y - pointB.y) / 2;
  
    const perimeter = ovalService.calculatePerimeter(oval);
    const expectedPerimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  
    expect(perimeter).toBeCloseTo(expectedPerimeter, 2);
  });
});