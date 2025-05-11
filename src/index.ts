import { OvalFactory, TetrahedronFactory } from './factories/ShapeFactory';
import { OvalValidator } from './validators/OvalValidator';
import { TetrahedronValidator } from './validators/TetrahedronValidator';
import { ShapeRepository } from './repositories/ShapeRepository';
import { ShapeWarehouse } from './warehouse/ShapeWarehouse';
import { WarehouseUpdater } from './observers/WarehouseUpdater';
import { NameSpecification } from './specifications/NameSpecification';
import { IdSpecification } from './specifications/IdSpecification';
import { QuadrantSpecification } from './specifications/QuadrantSpecification';
import { DistanceRangeSpecification } from './specifications/DistanceRangeSpeicifcation';
import { IdComparator } from './comparators/IdComparator';
import { NameComparator } from './comparators/NameComparator';
import { XCoordinateComparator } from './comparators/XYCoordinatesComparator';
import { YCoordinateComparator } from './comparators/XYCoordinatesComparator';
import fs from 'fs';
import path from 'path';
import logger from './utils/logger';
import { Point } from './models/Point';

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
  const repository = ShapeRepository.getInstance();
  const warehouseUpdater = new WarehouseUpdater();

  readDataFromFile(fileName).forEach((line, index) => {
    try {
      const points = validator.validateRaw(line);
      const oval = factory.createShape(`Oval ${index + 1}`, points);
      
      oval.addObserver(warehouseUpdater);
      
      repository.add(oval);
      
      oval.notifyObservers();
      
      logger.info(`Oval ${oval.id} created and added to repository`);
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
  const repository = ShapeRepository.getInstance();
  const warehouseUpdater = new WarehouseUpdater();

  readDataFromFile(fileName).forEach((line, index) => {
    try {
      const points = validator.validateRaw(line);
      const tetrahedron = factory.createShape(`Tetrahedron ${index + 1}`, points);
      
      tetrahedron.addObserver(warehouseUpdater);
      
      repository.add(tetrahedron);
      
      tetrahedron.notifyObservers();
      
      logger.info(`Tetrahedron ${tetrahedron.id} created and added to repository`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Invalid tetrahedron input: ${line}. ${error.message}`);
      } else {
        logger.error(`Invalid tetrahedron input: ${line}. Unknown error`);
      }
    }
  });
}

function demonstrateSpecifications() {
  const repository = ShapeRepository.getInstance();
  
  logger.info('=== SPECIFICATIONS ===');
  
  // Поиск по имени
  const NameToSearch = 'Oval 1'
  const nameSpec = new NameSpecification(NameToSearch);
  const foundByName = repository.find(nameSpec);
  logger.info(`Found ${foundByName.length} shapes with '${NameToSearch}' name`);
  
  // Поиск по ID
  const IdToSearch = '2'
  const IdSpec = new IdSpecification(IdToSearch);
  const foundById = repository.find(IdSpec);
  logger.info(`Found ${foundByName.length} shapes with '${IdToSearch}' ID`);

  // Поиск фигур в первом квадранте
  const quadrantSpec = new QuadrantSpecification(1);
  const inFirstQuadrant = repository.find(quadrantSpec);
  logger.info(`Found ${inFirstQuadrant.length} shapes in the first quadrant`);
  
  // Поиск фигур на расстоянии от 1 до 5 от начала координат
  const distanceSpec = new DistanceRangeSpecification(1, 5);
  const inRange = repository.find(distanceSpec);
  logger.info(`Found ${inRange.length} shapes at distance [1-5] from origin`);
}

function demonstrateSorting() {
  const repository = ShapeRepository.getInstance();
  
  logger.info('=== SORTING ===');
  
  // Сортировка по ID
  const comparatorID = new IdComparator();
  const sortedById = repository.sort(comparatorID);
  logger.info(`Sorted by ID: first element has ID ${sortedById[0].id}`);
  
  // Сортировка по имени
  const comparatorName = new NameComparator();
  const sortedByName = repository.sort(comparatorName);
  logger.info(`Sorted by name: first element has name ${sortedByName[0].name}`);
  
  // Сортировка по X-координате первой точки
  const comparatorX = new XCoordinateComparator();
  const sortedByX = repository.sort(comparatorX);
  logger.info(`Sorted by X coordinate: first element has X = ${sortedByX[0].points[0].x}`);
  
  // Сортировка по Y-координате первой точки
  const comparatorY = new YCoordinateComparator();
  const sortedByY = repository.sort(comparatorY);
  logger.info(`Sorted by Y coordinate: first element has Y = ${sortedByY[0].points[0].y}`);
}

function demonstrateWarehouse() {
  const repository = ShapeRepository.getInstance();
  const warehouse = ShapeWarehouse.getInstance();
  
  logger.info('=== WAREHOUSE ===');
  
  // Получение первой фигуры из репозитория
  const shapes = repository.getAll();
  if (shapes.length > 0) {
    const shape = shapes[0];
    const data = warehouse.get(shape.id);
    
    logger.info(`Shape ${shape.id}: area=${data?.area}, perimeter=${data?.perimeter}, volume=${data?.volume}`);
    
    // Изменение точки и проверка обновления warehouse
    if (shape.points.length > 0) {
      const oldPoint = shape.points[0];
      const newX = oldPoint.x + 1;
      logger.info(`Changing point 0 X from ${oldPoint.x} to ${newX}`);
      
      (shape as any).setPoint(0, new Point(newX, oldPoint.y, oldPoint.z));
      
      const updatedData = warehouse.get(shape.id);
      logger.info(`Updated shape ${shape.id}: area=${updatedData?.area}, perimeter=${updatedData?.perimeter}, volume=${updatedData?.volume}`);
    }
  }
}

function demonstrateRemoveById() {
  const repository = ShapeRepository.getInstance();
  
  logger.info('=== ID REMOVAL ===');
  
  const shapes = repository.getAll();
  
  if (shapes.length > 0) {
    const idToRemove = shapes[0].id;
    logger.info(`Attempting to remove shape with ID: ${idToRemove}`);
    
    const removed = repository.removeById(idToRemove);
    logger.info(`Direct removal result: ${removed ? 'success' : 'failed'}`);
    
    logger.info(`Remaining shapes: ${repository.count()}`);
    
  } else {
    logger.info('No shapes available to demonstrate removal');
  }
}

function main() {
  ShapeRepository.getInstance().clear();
  
  processOvals('ovals.txt');
  processTetrahedrons('tetrahedrons.txt');
  
  demonstrateSpecifications();
  demonstrateSorting();
  demonstrateWarehouse();
  demonstrateRemoveById();
}

main();