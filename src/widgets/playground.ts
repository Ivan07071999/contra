
import { Container, Texture, TilingSprite } from 'pixi.js';
import platforms from '../../src/shared/platforms.json';
import { Platform } from '../shared/platform';

export class Playground {
  public view: Container;
  public platforms: Platform[] = [];

  constructor() {
    this.view = new Container();
    this.createPlatforms();
    this.addWater();
  }

  private createPlatforms(): void {
    for (const platform of platforms.data) {
      const item = new Platform(platform.x, platform.y, platform.width, platform.height);
      this.view.addChild(item);
      this.platforms.push(item)
    }
  }

  private addWater(): void {
    const texture = Texture.from('water0000');
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: 800,
      height: texture.height,
    });

    tilingSprite.y = 600 - texture.height;

    console.log(texture);
    this.view.addChild(tilingSprite);
  }

  public get position(): number {
    return this.view.x;
  }

  public set position(value: number) {
    this.view.x = value;
  }
}
