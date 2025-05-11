import { ShapeObserver } from './ShapeObserver';
import { ShapeWarehouse } from '../warehouse/ShapeWarehouse';
import { Oval } from '../models/Oval';
import { Tetrahedron } from '../models/Tetrahedron';
import logger from '../utils/logger';

export class WarehouseUpdater implements ShapeObserver {
  update(shape: Oval | Tetrahedron): void {
    const warehouse = ShapeWarehouse.getInstance();
    
    try {
      if (shape instanceof Oval) {
        warehouse.update(shape, {
          area: shape.getArea(),
          perimeter: shape.getPerimeter(),
        });
        logger.info(`Updated warehouse for Oval ${shape.id}: area=${shape.getArea()}, perimeter=${shape.getPerimeter()}`);
      } else if (shape instanceof Tetrahedron) {
        warehouse.update(shape, {
          area: shape.getArea(),
          volume: shape.getVolume(),
        });
        logger.info(`Updated warehouse for Tetrahedron ${shape.id}: area=${shape.getArea()}, volume=${shape.getVolume()}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Error updating warehouse for shape ${shape.id}: ${error.message}`);
      } else {
        logger.error(`Unknown error updating warehouse for shape ${shape.id}`);
      }
    }
  }
}