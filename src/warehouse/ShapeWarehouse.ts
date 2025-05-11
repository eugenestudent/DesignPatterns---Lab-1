import { Oval } from '../models/Oval';
import { Tetrahedron } from '../models/Tetrahedron';
import logger from '../utils/logger';

type ShapeType = Oval | Tetrahedron;

interface ShapeData {
  area: number;
  volume?: number;
  perimeter?: number;
}

export class ShapeWarehouse {
  private static instance: ShapeWarehouse | null = null;
  private data: Map<string, ShapeData> = new Map();

  private constructor() {}

  static getInstance(): ShapeWarehouse {
    if (!ShapeWarehouse.instance) {
      ShapeWarehouse.instance = new ShapeWarehouse();
      logger.info('ShapeWarehouse instance created');
    }
    return ShapeWarehouse.instance;
  }

  update(shape: ShapeType, data: Partial<ShapeData>): void {
    const currentData = this.data.get(shape.id) || { area: 0 };
    
    const updatedData: ShapeData = {
      ...currentData,
      ...data,
      area: data.area !== undefined ? data.area : currentData.area,
    };
    
    this.data.set(shape.id, updatedData);
    logger.info(`Updated warehouse data for shape ${shape.id}`);
  }

  get(id: string): ShapeData | undefined {
    return this.data.get(id);
  }
  
  getAll(): Map<string, ShapeData> {
    return new Map(this.data);
  }
  
  clear(): void {
    this.data.clear();
  }
  
  remove(id: string): boolean {
    return this.data.delete(id);
  }
  
  getShapesInAreaRange(min: number, max: number): string[] {
    const result: string[] = [];
    this.data.forEach((data, id) => {
      if (data.area >= min && data.area <= max) {
        result.push(id);
      }
    });
    return result;
  }
  
  getShapesInVolumeRange(min: number, max: number): string[] {
    const result: string[] = [];
    this.data.forEach((data, id) => {
      if (data.volume !== undefined && data.volume >= min && data.volume <= max) {
        result.push(id);
      }
    });
    return result;
  }
  
  getShapesInPerimeterRange(min: number, max: number): string[] {
    const result: string[] = [];
    this.data.forEach((data, id) => {
      if (data.perimeter !== undefined && data.perimeter >= min && data.perimeter <= max) {
        result.push(id);
      }
    });
    return result;
  }
}