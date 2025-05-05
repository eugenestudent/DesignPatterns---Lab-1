import { OvalFactory, TetrahedronFactory } from './factories/ShapeFactory';
import { OvalValidator } from './validators/OvalValidator';
import { TetrahedronValidator } from './validators/TetrahedronValidator';
import { OvalService } from './services/OvalService';
import { TetrahedronService } from './services/TetrahedronService';
import fs from 'fs';
import path from 'path';
import logger from './utils/logger';

function readDataFromFile(fileName: string): string[] {
  const filePath = path.join(process.cwd(), 'data', fileName);
  if (!fs.existsSync(filePath)) {
    logger.error(`File not found: ${fileName}`);
    return [];
  }
  return fs.readFileSync(filePath, 'utf-8')
           .split('\n')
           .map(line => line.trim())
           .filter(line => line !== '');
}

function processOvals(fileName: string) {
  const factory = new OvalFactory();
  const validator = new OvalValidator();
  const service = new OvalService();

  readDataFromFile(fileName).forEach((line) => {
    try {
      const points = validator.validateRaw(line);
      const oval = factory.createShape('Oval', points);
      const area = service.calculateArea(oval);
      const perimeter = service.calculatePerimeter(oval);

      logger.info(`Oval created with area: ${area} and perimeter: ${perimeter}.`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Invalid oval input: ${line}. ${error.message}`);
      } else {
        logger.error(`Invalid oval input: ${line}. Unknown error`);
      }
    }
  });
}

function processTetrahedrons(fileName: string) {
  const factory = new TetrahedronFactory();
  const validator = new TetrahedronValidator();
  const service = new TetrahedronService();

  readDataFromFile(fileName).forEach((line) => {
    try {
      const points = validator.validateRaw(line);
      const tetrahedron = factory.createShape('Tetrahedron', points);
      const volume = service.calculateVolume(tetrahedron);
      const surfaceArea = service.calculateSurfaceArea(tetrahedron);
      logger.info(`Tetrahedron created with volume: ${volume} and surface area: ${surfaceArea}`);
    } catch (error: unknown) {
      logger.error(`Invalid tetrahedron input: ${line}`);
    }
  });
}

function main() {
  processOvals('ovals.txt');
  processTetrahedrons('tetrahedrons.txt');
}

main();