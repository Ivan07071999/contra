import { Container, Sprite, Texture } from "pixi.js";

export class HealthPoint extends Container {
  declare private texture: Texture;

  constructor() {
    super();

    this.texture = Texture.from('medal');
    this.y = 10;
  }

  public createHealthPoint(HP: number): void {
    this.removeChildren();

    for (let i = 1; i < HP; i += 1) {
      const item = new Sprite(this.texture);
      item.scale.set(1.5);
      item.x = i * (item.width + 5);

      this.addChild(item);
    }
  }
}
