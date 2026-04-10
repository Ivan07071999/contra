import { Container, Texture, TilingSprite } from "pixi.js";

export class Mountain extends Container {
  private mountain: TilingSprite;
  private mountainTexture: Texture;

  constructor(x: number, count: number) {
    super();

    this.x = x;
    this.y = 150;
    this.mountainTexture = Texture.from('mounts0000');

    this.mountain = new TilingSprite({
      texture: this.mountainTexture,
      width: this.mountainTexture.width * count,
      height: this.mountainTexture.height,
      tileScale: { x: 1, y: 1 },
    });

    this.addChild(this.mountain);
  }
}
