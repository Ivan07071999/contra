
import { Container, Texture, TilingSprite } from 'pixi.js';
import platforms from '../../src/shared/platforms.json';
import { Platform } from '../shared/platform';
import { Box } from '../shared/box';
import { Bridge } from '../shared/bridgeSegment';
import type { ISpriteAtlas } from '../shared/types';
import { Hero } from '../entities/hero';
import { PlaygroundAnimations } from '../features/playgroundAnimations';
import type { Bullet } from '../shared/bullets/bullet';
import { BulletFactory } from '../shared/bullets/bulletFactory';
import { Enemy } from '../entities/enemy';
import { Tourelle } from '../entities/tourelle';
import { Boss } from '../entities/boss';
import { WeaponBooster } from '../shared/weaponBooster';

export class Playground {
  public view: Container;
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
  public enemies: Enemy[] = [];
  public weaponBoosters: WeaponBooster[] = [];
  public bulletFactory: BulletFactory;
  public hero: Hero;
  public tourellies: Tourelle[] = [];
  public boss: Boss;
  declare public weaponBooster: WeaponBooster;

  constructor(atlasData: ISpriteAtlas) {
    this.view = new Container();
    this.bridgeContainer = new Container();
    this.bulletFactory = new BulletFactory(this.view, this.bullets);
    this.hero = new Hero(atlasData, this.bulletFactory);
    this.secondBridgeContainer = new Container();
    this.playgroundAnimations = new PlaygroundAnimations(atlasData);
    this.bridgesPosition = {
      first: { position: 1620, hasExploded: false },
      second: { position: 2260, hasExploded: false },
    };

    this.hero.x = 200;
    this.hero.y = 100;
    this.boss = new Boss(atlasData, this.bulletFactory);

    this.view.addChild(this.hero);

    this.createPlatforms();
    this.addWater();
    this.createBridge();
    this.createBoxes();
    this.update(this.hero);
    this.addEnemies(atlasData);
    this.addTourellies();
    this.addBoss();
    this.addWeaponBoosters();
  }

  private addWeaponBoosters(): void {
    for (const booster of platforms.weaponBoosters) {
      const item = new WeaponBooster(booster.x, booster.y);

      this.weaponBoosters.push(item);
      this.view.addChild(item);
    }
  };

  private addBoss(): void {
    this.view.addChild(this.boss);
  }

  private addTourellies(): void {
    for (const tourele of platforms.tourelles) {
      const item = new Tourelle(
        this.bulletFactory,
        this.hero,
        tourele.x,
        tourele.y,
        this.playgroundAnimations,
      );
      this.tourellies.push(item);
      this.view.addChild(item);
    }
  }

  private addEnemies(atlasData: ISpriteAtlas): void {
    for (const enemy of platforms.enemies) {
      const item = new Enemy(atlasData, enemy.x, enemy.y);
      this.view.addChild(item);
      this.enemies.push(item);
    }
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
    //console.log(this.view.x, this.view.y);

    for (const booster of this.weaponBoosters) {
      booster.update();
    }

    this.boss.update();

    for (const enemy of this.enemies) {
      enemy.update();
    }

    for (const tourele of this.tourellies) {
      tourele.update();
    }

    for (let i = 0; i < this.bullets.length; i += 1) {
      this.bullets[i].update();
      this.checkBullet(this.bullets[i], i);
    }

    if (!this.bridgesPosition.first.hasExploded && hero.x >= this.bridgesPosition.first.position) {
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
