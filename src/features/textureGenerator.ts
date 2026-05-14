import { Container, Texture, TilingSprite } from 'pixi.js';
import { Box } from '../shared/box';
import type { IBooster, IEnemy, IPlatform, ISpriteAtlas } from '../shared/types';
import { Platform } from '../shared/platform';
import { Enemy } from '../entities/enemy';
import type { SoundManager } from '../shared/soundManager';
import { WeaponBooster } from '../shared/weaponBooster';
import type { Boss } from '../entities/boss';
import { Tourelle } from '../entities/tourelle';
import type { BulletFactory } from '../shared/bullets/bulletFactory';
import type { Hero } from '../entities/hero';
import type { PlaygroundAnimations } from './playgroundAnimations';
import { Bridge } from '../shared/bridgeSegment';

export class TextureGenerator {

  public addWater(view: Container, water: Container): void {
    const texture = Texture.from('water0000');
    texture.frame.width -= 1;

    const tilingSprite = new TilingSprite({
      texture: texture,
      width: 3550,
      height: texture.height,
    });

    tilingSprite.y = 600 - texture.height;
    water.zIndex = 1;

    water.addChild(tilingSprite);
    view.addChild(water);
  }

  public createBoxes(view: Container, arrBoxes: Box[], boxesData: IPlatform[]): void {
    for (const box of boxesData) {
      const item = new Box(box.x, box.y, box.width, box.height);
      view.addChild(item);
      arrBoxes.push(item);
    }
  }

  public createPlatforms(
    view: Container,
    arrPlatforms: Platform[],
    platformsData: IPlatform[],
  ): void {
    for (const platform of platformsData) {
      const item = new Platform(platform.x, platform.y, platform.width, platform.height);
      view.addChild(item);
      arrPlatforms.push(item);
    }
  }

  public addEnemies(
    atlasData: ISpriteAtlas,
    view: Container,
    enemies: Enemy[],
    enemiesData: IEnemy[],
    soundManager: SoundManager,
  ): void {
    for (const enemy of enemiesData) {
      const item = new Enemy(atlasData, soundManager, enemy.x, enemy.y);
      view.addChild(item);
      enemies.push(item);
    }
  }

  public addWeaponBoosters(
    view: Container,
    weaponBoosters: WeaponBooster[],
    boostersData: IBooster[],
  ): void {
    for (const booster of boostersData) {
      const item = new WeaponBooster(booster.x, booster.y);
      weaponBoosters.push(item);
      view.addChild(item);
    }
  }

  public addBoss(view: Container, boss: Boss): void {
    view.addChild(boss);
  }

  public addTourellies(
    view: Container,
    bulletFactory: BulletFactory,
    hero: Hero,
    tourellies: Tourelle[],
    tourelliesData: IEnemy[],
    animations: PlaygroundAnimations,
  ): void {
    for (const tourele of tourelliesData) {
      const item = new Tourelle(bulletFactory, hero, tourele.x, tourele.y, animations);
      tourellies.push(item);
      view.addChild(item);
    }
  }

  public createBridge(
    view: Container,
    bridgeContainer: Container,
    bridges: Bridge[],
    bridgeData: IEnemy[],
    animation: PlaygroundAnimations,
    position: number,
  ): void {
    for (const segment of bridgeData) {
      const item = new Bridge(segment.x, segment.y, animation);
      bridgeContainer.addChild(item);
      bridges.push(item);
    }

    bridgeContainer.x = position;

    view.addChild(bridgeContainer);
  }
}
