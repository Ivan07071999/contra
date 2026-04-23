
import { Container, Sprite, Texture, TilingSprite } from 'pixi.js';
import platforms from '../../src/shared/platforms.json';
import { Platform } from '../shared/platform';
import { Box } from '../shared/box';
import { Bridge } from '../shared/bridgeSegment';
import type { ISpriteAtlas } from '../shared/types';
import type { Hero } from '../entities/hero';
import { PlaygroundAnimations } from '../features/playgroundAnimations';
import type { Bullet } from '../shared/bullets/bullet';
import { BulletFactory } from '../shared/bullets/bulletFactory';

export class Playground {
  public view: Container;
  private bossContainer: Container;
  private bridgeContainer: Container;
  private secondBridgeContainer: Container;
  public platforms: Platform[] = [];
  public boxes: Box[] = [];
  public bridges: Bridge[] = [];
  public secondBridges: Bridge[] = [];
  private bridgesPosition: {
    first: { position: number; hasExploded: boolean };
    second: { position: number; hasExploded: boolean };
  };
  public hasExploded = false;
  private playgroundAnimations: PlaygroundAnimations;
  public bullets: Bullet[] = [];
  private bulletFactory: BulletFactory;
  private hero: Hero;
  declare private recharge: number;

  constructor(atlasData: ISpriteAtlas, hero: Hero) {
    this.view = new Container();
    this.bossContainer = new Container();
    this.bridgeContainer = new Container();
    this.hero = hero;
    this.bulletFactory = new BulletFactory();
    this.secondBridgeContainer = new Container();
    this.playgroundAnimations = new PlaygroundAnimations(atlasData);
    this.bridgesPosition = {
      first: { position: 1620, hasExploded: false },
      second: { position: 2260, hasExploded: false },
    };

    this.createPlatforms();
    this.addWater();
    this.createBridge();
    this.addBoss();
    this.createBoxes();
    this.update(hero);
  }

  public createBullet = (): void => {
    const now = Date.now();
    if (now - this.recharge < 200) return;

    const bullet = this.bulletFactory.createBullet(this.hero.bulletContext);
    this.view.addChild(bullet);
    this.bullets.push(bullet);

    this.recharge = now;
  };

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

    this.bossContainer.scale.set(1.3);

    this.bossContainer.position.set(6910, 180);
    this.bossContainer.addChild(bossSprite, bossDoor, bossGun, bossGun2);
    this.view.addChild(this.bossContainer);
  }

  private addWater(): void {
    const texture = Texture.from('water0000');
    texture.frame.width -= 1;

    const tilingSprite = new TilingSprite({
      texture: texture,
      width: 3550,
      height: texture.height,
    });

    tilingSprite.y = 600 - texture.height;
    tilingSprite.zIndex = 1;

    this.view.addChild(tilingSprite);
  }

  private createBridge(): void {
    for (const segment of platforms.bridge) {
      const item = new Bridge(segment.x, segment.y, this.playgroundAnimations);
      this.bridgeContainer.addChild(item);
      this.bridges.push(item);

      const item2 = new Bridge(segment.x, segment.y, this.playgroundAnimations);
      this.secondBridgeContainer.addChild(item2);
      this.secondBridges.push(item2);
    }

    this.bridgeContainer.x = this.bridgesPosition.first.position;
    this.secondBridgeContainer.x = this.bridgesPosition.second.position;

    this.view.addChild(this.bridgeContainer, this.secondBridgeContainer);
  }

  private checkBullet(bullet: Bullet, index: number) {
    if (bullet.x > 800 - this.view.x || bullet.x < -this.view.x || bullet.y > 600 || bullet.y < 0) {
      bullet.removeFromParent();
      this.bullets.splice(index, 1);
    }
  }

  public update(hero: Hero): void {
    for (let i = 0; i < this.bullets.length; i += 1) {
      this.bullets[i].update();
      this.checkBullet(this.bullets[i], i);
    }

    if (!this.bridgesPosition.first.hasExploded && hero.x >= this.bridgesPosition.first.position) {
      console.log('boom 1');

      this.bridges.forEach((segment, interval) => {
        setTimeout(() => {
          segment.blowUpSegment();
        }, interval * 500);
      });

      this.bridgesPosition.first.hasExploded = true;
    }

    if (
      !this.bridgesPosition.second.hasExploded &&
      hero.x >= this.bridgesPosition.second.position
    ) {
      console.log('boom 2');

      this.secondBridges.forEach((segment, interval) => {
        setTimeout(() => {
          segment.blowUpSegment();
        }, interval * 500);
      });

      this.bridgesPosition.second.hasExploded = true;
    }
  }

  public get position(): number {
    return this.view.x;
  }

  public set position(value: number) {
    this.view.x = value;
  }
}
