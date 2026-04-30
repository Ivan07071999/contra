import { Container, Rectangle, Sprite, Texture } from 'pixi.js';

export class Platform extends Container {
  private tiles: Sprite[] = [];
  public bounds: Rectangle;

  constructor(x: number, y: number, width: number, height: number) {
    super();

    this.x = Math.floor(x);
    this.y = Math.floor(y);

    const platformTexture = Texture.from('platform0000');
    const groundTexture = Texture.from('ground0000');

    platformTexture.source.style.scaleMode = 'nearest';
    groundTexture.source.style.scaleMode = 'nearest';

    for (let i = 0; i < width; i += 1) {
      const tile = new Sprite(platformTexture);
      tile.scale.set(0.5);
      tile.width -= 0.5;
      tile.x = Math.floor(tile.width * i);

      this.tiles.push(tile);
      this.addChild(tile);

      for (let j = 0; j < height; j += 1) {
        const ground = new Sprite(groundTexture);
        ground.scale.set(0.5);
        ground.width -= 0.5;
        ground.height -= 0.5;
        ground.x = Math.floor(ground.width * i);
        ground.y = Math.floor(ground.height * j + ground.height);
        this.addChild(ground);
      }
    }

    this.bounds = new Rectangle(this.x, this.y, this.width, this.height);
  }
}
