import { ShapeRepository } from '../src/repositories/ShapeRepository';
import { Oval } from '../src/models/Oval';
import { Point } from '../src/models/Point';
import { IdSpecification } from '../src/specifications/IdSpecification';
import { NameSpecification } from '../src/specifications/NameSpecification';
import { IdComparator } from '../src/comparators/IdComparator';
import { NameComparator } from '../src/comparators/NameComparator';
import { XCoordinateComparator } from '../src/comparators/XYCoordinatesComparator';

describe('ShapeRepository', () => {
  beforeEach(() => {
    // Очищаем репозиторий перед каждым тестом
    ShapeRepository.getInstance().clear();
  });

  test('should add and retrieve shapes', () => {
    const repository = ShapeRepository.getInstance();
    const oval = new Oval('1', 'Test Oval', [new Point(0, 0), new Point(4, 6)]);
    
    repository.add(oval);
    
    expect(repository.count()).toBe(1);
    expect(repository.getById('1')).toBe(oval);
  });

  test('should remove shapes by id', () => {
    const repository = ShapeRepository.getInstance();
    const oval = new Oval('1', 'Test Oval', [new Point(0, 0), new Point(4, 6)]);
    
    repository.add(oval);
    expect(repository.count()).toBe(1);
    
    repository.removeById('1');
    expect(repository.count()).toBe(0);
    expect(repository.getById('1')).toBeUndefined();
  });

  test('should find shapes using specifications', () => {
    const repository = ShapeRepository.getInstance();
    const oval1 = new Oval('1', 'Oval One', [new Point(0, 0), new Point(4, 6)]);
    const oval2 = new Oval('2', 'Oval Two', [new Point(1, 1), new Point(5, 7)]);
    
    repository.add(oval1);
    repository.add(oval2);
    
    // Поиск по ID
    const idSpec = new IdSpecification('1');
    const byId = repository.find(idSpec);
    expect(byId.length).toBe(1);
    expect(byId[0].id).toBe('1');
    
    // Поиск по имени
    const nameSpec = new NameSpecification('Oval Two');
    const byName = repository.find(nameSpec);
    expect(byName.length).toBe(1);
    expect(byName[0].id).toBe('2');
  });

  test('should sort shapes by comparator', () => {
    const repository = ShapeRepository.getInstance();
    const oval1 = new Oval('2', 'B Oval', [new Point(3, 0), new Point(4, 6)]);
    const oval2 = new Oval('1', 'A Oval', [new Point(1, 1), new Point(5, 7)]);
    
    repository.add(oval1);
    repository.add(oval2);
    
    // Сортировка по ID
    
    const comparatorID = new IdComparator();
    const sortedById = repository.sort(comparatorID);

    expect(sortedById[0].id).toBe('1');
    expect(sortedById[1].id).toBe('2');
    
    // Сортировка по имени
    const comparatorName = new NameComparator();
    const sortedByName = repository.sort(comparatorName);
    expect(sortedByName[0].name).toBe('A Oval');
    expect(sortedByName[1].name).toBe('B Oval');
    
    // Сортировка по X-координате
    const comparatorX = new XCoordinateComparator();
    const sortedByX = repository.sort(comparatorX);
    expect(sortedByX[0].points[0].x).toBe(1);
    expect(sortedByX[1].points[0].x).toBe(3);
  });
});