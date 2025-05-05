import { Point } from "./Point";

export abstract class Shape {
    constructor(
      public id: string,
      public points: Point[]
    ) {}
  }