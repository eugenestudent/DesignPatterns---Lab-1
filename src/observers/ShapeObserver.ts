import { Shape } from '../models/Shape';

export interface ShapeObserver {
    update(shape: Shape): void;
}