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

    //this.platformTexture.source.style.addressMode = 'repeat';
    this.platformTexture.source.style.scaleMode = 'nearest';
    //this.groundTexture.source.style.addressMode = 'repeat';
    this.groundTexture.source.style.scaleMode = 'nearest';

    const platformFrame = this.platformTexture.frame;
    platformFrame.x += 0.5;
    platformFrame.y += 0.5;
    platformFrame.width -= 1;
    platformFrame.height -= 1;

    // const groundFrame = this.groundTexture.frame;
    // groundFrame.x += 1;
    // groundFrame.y += 1;
    // groundFrame.width -= 1;
    // groundFrame.height -= 1;

    this.platform = new TilingSprite({
      texture: this.platformTexture,
      width: width,
      height: height,
    });

    this.ground = new TilingSprite({
      texture: this.groundTexture,
      width: width,
      height: 600 - (y + this.platform.height)
    });

    this.platform.tileScale.set(0.3);
    this.ground.tileScale.set(0.3);
    this.ground.y = this.platform.height - 1;

    this.bounds = new Rectangle(x, y, width, height);

    this.addChild(this.platform, this.ground);
  }
}
