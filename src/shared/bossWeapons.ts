import { Sprite, AnimatedSprite, Texture, Container } from "pixi.js";
import type { PlaygroundAnimations } from "../features/playgroundAnimations";
import type { BulletFactory } from "./bullets/bulletFactory";

export class BossWeapons {
  declare public bossGun: Sprite | AnimatedSprite;
  declare public bossGun2: Sprite | AnimatedSprite;
  private bulletFactory: BulletFactory;
  private animations: PlaygroundAnimations;
  private recharge = 0;
  private firstGunIsDestroy = false;
  private secondGunIsDestroy = false;
  private gunsPosition = {
    firstGunX: 43,
    gunY: 140,
    secondGunX: 2,
  };

  declare private gun: Container;
  declare private gun2: Container;
  public bossWeapons: Container[];
  public bossGunHP = [5, 5];

  constructor(animations: PlaygroundAnimations, bulletFactory: BulletFactory) {
    this.animations = animations;
    this.bulletFactory = bulletFactory;
    this.gun = new Container();
    this.gun2 = new Container();
    this.createWeapons();
    this.bossWeapons = [this.gun, this.gun2];
  }

  private createWeapons(): void {
    const bossGunTexture = Texture.from('bossgun0000');
    const bossGunTexture2 = Texture.from('bossgun0001');
    this.bossGun = new Sprite(bossGunTexture);
    this.bossGun2 = new Sprite(bossGunTexture2);

    this.bossGun.scale.set(0.8);
    this.bossGun2.scale.set(0.8);

    this.bossGun.y = this.gunsPosition.gunY;
    this.bossGun.x = this.gunsPosition.firstGunX;
    this.bossGun2.x = this.gunsPosition.secondGunX;
    this.bossGun2.y = this.gunsPosition.gunY;

    this.gun.addChild(this.bossGun);
    this.gun2.addChild(this.bossGun2);
  }

  private destroyWeapon(container: Container, sprite: Sprite): void {
    const currentScale = sprite.scale.x;

    const centerX = sprite.x + sprite.width / 2;
    const centerY = sprite.y + sprite.height / 2;

    sprite.removeFromParent();

    const explosion = this.animations.explosionAnimation();
    explosion.anchor.set(0.5, 0.5);
    explosion.position.set(centerX, centerY);
    explosion.scale.set(currentScale);

    container.addChild(explosion);

    explosion.onComplete = () => {
      container.removeFromParent();
      explosion.destroy();
    };
  }

  private fire(): void {
    this.recharge += 1;

    if (this.recharge < 50) return;

    const firstBulletContext = {
      x: 6966,
      y: 369,
      angle: 0,
      type: 'enemyBullet',
    };

    const secondBulletContext = {
      x: 6912,
      y: 369,
      angle: 0,
      type: 'enemyBullet',
    };

    this.bulletFactory.createBossBullet(firstBulletContext, this.firstGunIsDestroy);
    this.bulletFactory.createBossBullet(secondBulletContext, this.secondGunIsDestroy);
    this.recharge = 0;
  }

  public update(): void {
    this.fire();
    if (this.bossGunHP[0] === 0) {
      this.firstGunIsDestroy = true;
      this.destroyWeapon(this.gun, this.bossGun)
    };

    if (this.bossGunHP[1] === 0) {
      this.secondGunIsDestroy = true;
      this.destroyWeapon(this.gun2, this.bossGun2)

    };
  }
}
