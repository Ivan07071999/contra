import { Container, Graphics, Rectangle } from "pixi.js";

export class Box extends Container {
  public bounds: Rectangle;
  private graphics: Graphics;

  constructor(x: number, y: number, width: number, height: number) {
    super();

    this.x = x;
    this.y = y;

    this.graphics = new Graphics()
      .setStrokeStyle({ width: 0, color: 'red' })
      .rect(0, 0, width, height)
      .stroke();

    this.addChild(this.graphics)

    this.bounds = new Rectangle(x, y, width, height);
  }
}
