import { WarehouseUpdater } from '../src/observers/WarehouseUpdater';
import { ShapeWarehouse } from '../src/warehouse/ShapeWarehouse';
import { Oval } from '../src/models/Oval';
import { Tetrahedron } from '../src/models/Tetrahedron';
import { Point } from '../src/models/Point'; 

describe('WarehouseUpdater', () => {
  let updater: WarehouseUpdater;
  let warehouse: ShapeWarehouse;

  beforeEach(() => {
    updater = new WarehouseUpdater();
    warehouse = ShapeWarehouse.getInstance();

    // Очищаем хранилище перед каждым тестом
    (warehouse as any).data.clear?.();
  });

  it('should correctly update warehouse for Oval', () => {
    const oval = new Oval('oval-1', 'Test Oval', [new Point(0, 0), new Point(4, 2)]);
    
    const expectedArea = oval.getArea();
    const expectedPerimeter = oval.getPerimeter();

    updater.update(oval);

    const storedData = warehouse.get(oval.id);
    expect(storedData).toEqual({
      area: expectedArea,
      perimeter: expectedPerimeter,
    });
  });

  it('should correctly update warehouse for Tetrahedron', () => {
    const tetra = new Tetrahedron('tetra-1', 'Test Tetrahedron', [
      new Point(0, 0, 0),
      new Point(1, 0, 0),
      new Point(0, 1, 0),
      new Point(0, 0, 1),
    ]);

    const expectedArea = tetra.getArea();
    const expectedVolume = tetra.getVolume();

    updater.update(tetra);

    const storedData = warehouse.get(tetra.id);
    expect(storedData).toEqual({
      area: expectedArea,
      volume: expectedVolume,
    });
  });
});
