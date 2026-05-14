import { Container } from 'pixi.js';
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
import { EndGame } from '../shared/endGame';
import { SoundManager } from '../shared/soundManager';
import { HealthPoint } from '../shared/medal';
import { TextureGenerator } from '../features/textureGenerator';
import { PlaygroundUpdate } from '../features/playgroundUpdate';

export class Playground {
  public view: Container;
  private bridgeContainer: Container;
  private secondBridgeContainer: Container;
  public platforms: Platform[] = [];
  public boxes: Box[] = [];
  public bridges: Bridge[] = [];
  public secondBridges: Bridge[] = [];
  private bridgesPosition = {
    first: { position: 1620, hasExploded: false },
    second: { position: 2260, hasExploded: false },
  };
  public hasExploded = false;
  private playgroundAnimations: PlaygroundAnimations;
  public bullets: Bullet[] = [];
  public enemies: Enemy[] = [];
  public weaponBoosters: WeaponBooster[] = [];
  public bulletFactory: BulletFactory;
  private endGame: EndGame;
  public hero: Hero;
  public water: Container;
  public tourellies: Tourelle[] = [];
  public boss: Boss;
  private atlasData: ISpriteAtlas;
  declare public weaponBooster: WeaponBooster;
  private soundManager: SoundManager;
  private healthPoint: HealthPoint;
  private textureGenerator: TextureGenerator;
  private playgroundUpdate : PlaygroundUpdate;

  constructor(atlasData: ISpriteAtlas, soundManager: SoundManager) {
    this.view = new Container();
    this.atlasData = atlasData;
    this.bridgeContainer = new Container();
    this.soundManager = soundManager;
    this.water = new Container();
    this.bulletFactory = new BulletFactory(this.view, this.bullets);
    this.hero = new Hero(atlasData, this.bulletFactory, this.soundManager);
    this.healthPoint = new HealthPoint();
    this.secondBridgeContainer = new Container();
    this.playgroundAnimations = new PlaygroundAnimations(atlasData, this.soundManager);
    this.textureGenerator = new TextureGenerator();
    this.playgroundUpdate = new PlaygroundUpdate();

    this.hero.x = 200;
    this.hero.y = 100;
    this.boss = new Boss(this.atlasData, this.bulletFactory, this.soundManager);
    this.endGame = new EndGame(300);

    this.view.addChild(this.hero);

    this.textureGenerator.createPlatforms(this.view, this.platforms, platforms.data);
    this.textureGenerator.addWater(this.view, this.water);
    this.addBridges();
    this.textureGenerator.createBoxes(this.view, this.boxes, platforms.boxes);
    this.textureGenerator.addEnemies(this.atlasData, this.view, this.enemies, platforms.enemies, this.soundManager );
    this.textureGenerator.addTourellies(this.view, this.bulletFactory, this.hero, this.tourellies, platforms.tourelles, this.playgroundAnimations);
    this.textureGenerator.addBoss(this.view, this.boss);
    this.textureGenerator.addWeaponBoosters(this.view, this.weaponBoosters, platforms.weaponBoosters);
    this.createHPView();
    this.update();
  }

  private resetPlayground = (): void => {
    this.enemies.forEach((enemy) => {
      enemy.removeFromParent();
      enemy.destroy();
    });

    this.tourellies.forEach((tourele) => {
      tourele.removeFromParent();
      tourele.destroy();
    });

    this.weaponBoosters.forEach((booster) => {
      booster.removeFromParent();
      booster.destroy();
    });

    this.boss.removeChildren();

    this.tourellies = [];
    this.enemies = [];
    this.weaponBoosters = [];
    this.bridges = [];
    this.secondBridges = [];
    this.bridgeContainer.removeChildren();
    this.secondBridgeContainer.removeChildren();
    this.bridgesPosition.first.hasExploded = false;
    this.bridgesPosition.second.hasExploded = false;
    this.boss.removeFromParent();
    this.boss.destroy();
    this.boss = new Boss(this.atlasData, this.bulletFactory, this.soundManager);

    this.textureGenerator.addEnemies(this.atlasData, this.view, this.enemies, platforms.enemies, this.soundManager );
    this.textureGenerator.addTourellies(this.view, this.bulletFactory, this.hero, this.tourellies, platforms.tourelles, this.playgroundAnimations);
    this.textureGenerator.addWeaponBoosters(this.view, this.weaponBoosters, platforms.weaponBoosters);
    this.addBridges();
    this.textureGenerator.addBoss(this.view, this.boss);

    this.hero.HP = 3;
    this.position = 0;
    this.hero.x = 200;
    this.hero.y = 100;
    this.healthPoint.createHealthPoint(this.hero.HP);
  }

  private addBridges(): void {
    this.textureGenerator.createBridge(this.view, this.bridgeContainer, this.bridges, platforms.bridge, this.playgroundAnimations, this.bridgesPosition.first.position);
    this.textureGenerator.createBridge(this.view, this.secondBridgeContainer, this.secondBridges, platforms.bridge, this.playgroundAnimations, this.bridgesPosition.second.position);
  }

  private createHPView(): void {
    this.healthPoint.createHealthPoint(this.hero.HP);
    this.view.addChild(this.healthPoint);
  }

  private checkBullet(bullet: Bullet, index: number) {
    if (bullet.x > 800 - this.view.x || bullet.x < -this.view.x || bullet.y > 600 || bullet.y < 0) {
      bullet.removeFromParent();
      this.bullets.splice(index, 1);
    }
  }

  public update(): void {
    this.playgroundUpdate.limitHeroPosition(this.hero, this.view.x, this.boss.x);
    this.playgroundUpdate.checkHeroDead(this.hero, this.view, this.endGame, this.view.x, this.healthPoint, this.resetPlayground);
    this.playgroundUpdate.updateWeaponBooster(this.weaponBoosters, this.hero, this.boss.x, this.view.height);
    this.playgroundUpdate.blowUpBridge(this.hero, this.bridges, this.bridgesPosition.first);
    this.playgroundUpdate.blowUpBridge(this.hero, this.secondBridges, this.bridgesPosition.second);
    this.playgroundUpdate.checkEndGame(this.view, this.boss.bossDoor.HP, this.endGame, this.tourellies);
    this.boss.update();

    for (const enemy of this.enemies) {
      if (Math.abs(this.hero.x - enemy.x) <= 800) enemy.update();
    }

    for (const tourele of this.tourellies) {
      if (tourele.x > this.view.x || tourele.x < -this.view.x + this.hero.x) tourele.update();
    }

    for (let i = 0; i < this.bullets.length; i += 1) {
      this.bullets[i].update();
      this.checkBullet(this.bullets[i], i);
    }
  }

  public get position(): number {
    return this.view.x;
  }

  public set position(value: number) {
    this.view.x = value;
  }

  public set HPPosition(value: number) {
    this.healthPoint.x = value;
  }
}
