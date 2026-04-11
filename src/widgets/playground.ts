
import { Container, Sprite, Texture, TilingSprite } from 'pixi.js';
import platforms from '../../src/shared/platforms.json';
import { Platform } from '../shared/platform';
import { Box } from '../shared/box';

export class Playground {
  public view: Container;
  private bossContainer: Container;
  public platforms: Platform[] = [];
  public boxes: Box[] = [];

  constructor() {
    this.view = new Container();
    this.bossContainer = new Container();
    this.createPlatforms();
    this.addWater();
    this.addBridge(1650);
    this.addBridge(2250);
    this.addBoss();
    this.createBoxes();
  }

  private createPlatforms(): void {
    for (const platform of platforms.data) {
      const item = new Platform(platform.x, platform.y, platform.width, platform.height);
      this.view.addChild(item);
      this.platforms.push(item);
    }
  }

  private createBoxes(): void {
    for (const box of platforms.boxes) {
      const item = new Box(box.x, box.y, box.width, box.height);
      this.view.addChild(item);
      this.boxes.push(item);
    }
  }

  private addBoss(): void {
    const bossTexture = Texture.from('boss0000');
    const bossDoorTexture = Texture.from('bossdoor0001');
    const bossGunTexture = Texture.from('bossgun0000');

    const bossGun = new Sprite(bossGunTexture);
    const bossGun2 = new Sprite(bossGunTexture);
    const bossDoor = new Sprite(bossDoorTexture);
    const bossSprite = new Sprite(bossTexture);

    bossSprite.scale.set(0.7);
    bossDoor.scale.set(0.7);
    bossGun.scale.set(0.7);
    bossGun2.scale.set(0.7);

    bossGun.y = 140;
    bossGun2.y = 140;
    bossGun2.x = 35;
    bossDoor.x = 15;
    bossDoor.y = 200;

    this.bossContainer.scale.set(1.2);

    this.bossContainer.position.set(5820, 220);
    this.bossContainer.addChild(bossSprite, bossDoor, bossGun, bossGun2);
    this.view.addChild(this.bossContainer);
  }

  private addWater(): void {
    const texture = Texture.from('water0000');
    texture.frame.width -= 1;

    const tilingSprite = new TilingSprite({
      texture: texture,
      width: 3500,
      height: texture.height,
    });

    tilingSprite.y = 600 - texture.height;

    this.view.addChild(tilingSprite);
  }

  private addBridge(x: number): void {
    const texture = Texture.from('bridge0000');
    const tilingSprite = new TilingSprite({
      texture: texture,
      width: 600,
      height: texture.height,
    });

    tilingSprite.scale.set(0.5);

    tilingSprite.x = x;
    tilingSprite.y = 348;

    this.view.addChild(tilingSprite);
  }

  public get position(): number {
    return this.view.x;
  }

  public set position(value: number) {
    this.view.x = value;
  }
}
