
import { Container, Texture, TilingSprite } from 'pixi.js';
import platforms from '../../src/shared/platforms.json';
import { Platform } from '../shared/platform';

export class Playground {
  public view: Container;
  public platforms: Platform[] = [];

  constructor() {
    this.view = new Container();
    this.addJungle();
    this.createPlatforms();
    this.addWater();
    this.addBridge(1650);
    this.addBridge(2250);
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
      width: 3500,
      height: texture.height,
    });

    tilingSprite.y = 600 - texture.height;

    console.log(texture);
    this.view.addChild(tilingSprite);
  }

  private addBridge(x: number): void {
    const texture = Texture.from('bridge0000');
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: 600,
      height: texture.height,
    });

    tilingSprite.scale.set(0.5)

    tilingSprite.x = x;
    tilingSprite.y = 348;

    this.view.addChild(tilingSprite);
  }

  private addJungle(): void {
    const jungleTopTexture = Texture.from('jungletop0000');
    const jungleBottomTexture = Texture.from('junglebottom0000');

    const jungleTopTilingSprite = new TilingSprite({
      texture: jungleTopTexture,
      width: 5850 - 2895,
      height: jungleTopTexture.height / 2,
      tileScale: { x: 0.5, y: 0.5 },
    });

    const jungleBottomTilingSprite = new TilingSprite({
      texture: jungleBottomTexture,
      width: 5850 - 2895,
      height: 600 - jungleBottomTexture.height / 2,
      tileScale: { x: 0.5, y: 0.5 },
    });

    jungleBottomTilingSprite.y = jungleTopTexture.height / 2;

    jungleTopTilingSprite.x = 2895;
    jungleBottomTilingSprite.x = 2895;

    this.view.addChild(jungleTopTilingSprite, jungleBottomTilingSprite);
  }

  public get position(): number {
    return this.view.x;
  }

  public set position(value: number) {
    this.view.x = value;
  }
}
