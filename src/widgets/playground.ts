
import { Container, Sprite, Texture, TilingSprite } from 'pixi.js';
import platforms from '../../src/shared/platforms.json';
import { Platform } from '../shared/platform';
import { Box } from '../shared/box';
import { Bridge } from '../shared/bridgeSegment';
import type { ISpriteAtlas } from '../shared/types';
import type { Hero } from '../entities/hero';
import { PlaygroundAnimations } from '../features/playgroundAnimations';

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
    first: { position: number, hasExploded: boolean };
    second: { position: number, hasExploded: boolean };
  };
  public hasExploded = false;
  private playgroundAnimations: PlaygroundAnimations;

  constructor(atlasData: ISpriteAtlas, hero: Hero) {
    this.view = new Container();
    this.bossContainer = new Container();
    this.bridgeContainer = new Container();
    this.secondBridgeContainer = new Container();
    this.playgroundAnimations = new PlaygroundAnimations(atlasData);
    this.bridgesPosition = {
      first: { position: 1650, hasExploded: false },
      second: { position: 2270, hasExploded: false },
    };

    this.createPlatforms();
    this.addWater();
    this.createBridge();
    this.addBoss();
    this.createBoxes();
    this.update(hero);
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

  public update(hero: Hero): void {
    if (!this.bridgesPosition.first.hasExploded && hero.x >= this.bridgesPosition.first.position) {
      console.log('boom 1');

      this.bridges.forEach((segment, interval) => {
        setTimeout(() => {
          segment.blowUpSegment();
        }, interval * 500);
      });

      this.bridgesPosition.first.hasExploded = true;
    }

    if (!this.bridgesPosition.second.hasExploded && hero.x >= this.bridgesPosition.second.position) {
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
