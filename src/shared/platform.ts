import { Container, Graphics, Rectangle } from 'pixi.js';

export class Platform extends Container {
  private platform: Graphics;
  public bounds: Rectangle;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.platform = new Graphics()
      .rect(x, x, width, height)
      .stroke({ color: 'green', width: 2 });

    this.bounds = new Rectangle(x, y, width, height);

    this.addChild(this.platform)
  }
}
