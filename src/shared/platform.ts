import { Container, Rectangle, Texture, TilingSprite } from 'pixi.js';

export class Platform extends Container {
  private platform: TilingSprite;
  private ground: TilingSprite;
  private platformTexture: Texture;
  private groundTexture: Texture
  public bounds: Rectangle;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.platformTexture = Texture.from('platform0000');
    this.groundTexture = Texture.from('ground0000');

    this.platformTexture.source.style.addressMode = 'repeat';
    this.platformTexture.source.style.scaleMode = 'nearest';
    this.groundTexture.source.style.addressMode = 'repeat';
    this.groundTexture.source.style.scaleMode = 'nearest';

    this.platform = new TilingSprite({
      texture: this.platformTexture,
      width: width,
      height: this.platformTexture.height / 2,
      tileScale: { x: 0.5, y: 0.5 },
    });

    this.ground = new TilingSprite({
      texture: this.groundTexture,
      width: width,
      height: 600 - (y + this.platform.height),
      tileScale: { x: 0.5, y: 0.5 },
    });

    this.ground.y = this.platform.height;

    this.bounds = new Rectangle(x, y, width, height);

    this.addChild(this.platform, this.ground);
  }
}
