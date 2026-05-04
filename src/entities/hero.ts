import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js';
import { HeroAnimations } from '../features/heroAnimation';
import type { IBulletContext, ISpriteAtlas } from '../shared/types';
import type { BulletFactory } from '../shared/bullets/bulletFactory';
import { Weapon } from '../shared/weapon';

export class Hero extends Container {
  private heroAnimations: HeroAnimations;
  public weapon: Weapon;
  private hero: Sprite | AnimatedSprite | Container;
  private GRAVITY_FORCE = 0.1;
  private JUMP_FORCE = 5.5;
  private SPEED = 2;
  public HP = 3;
  private velocityX = 0;
  public velocityY = 0;
  private movement = { x: 0, y: 0 };
  public isGrounded = false;
  private isLie = false;
  public runUp = false;
  public runDown = false;
  public stayUp = false;
  public isFlyDown = false;
  public isSwimming = false;
  private isFlipped = false;
  public runAndShoot = false;
  public isDead = false;
  private isInvincible = false;
  declare private recharge: number;
  public rechargeTime = 200;
  private bulletFactory: BulletFactory;
  private currentAnimateState = 'stay';
  declare private bulletAngle: number;
  public bulletPosition: IBulletContext = {
    x: 0,
    y: 0,
    angle: 0,
    type: 'heroBullet',
  };
  private bulletPointShift = {
    x: 0,
    y: 0,
  };

  constructor(atlasData: ISpriteAtlas, bulletFactory: BulletFactory) {
    super();
    this.bulletFactory = bulletFactory;
    this.weapon = new Weapon(this.bulletFactory);
    this.heroAnimations = new HeroAnimations(atlasData);
    this.hero = new Sprite(Texture.WHITE);
    this.setAnimation('jump');

    this.addChild(this.hero);
    this.scale.set(0.7);
    this.zIndex = 1;
  }

  private setBulletPointShift(x: number, y: number): void {
    this.bulletPointShift.x = (x + this.scale.x * this.scale.x) * this.scale.x;
    this.bulletPointShift.y = y;
  }

  private setAnimation(state: string): void {
    if (this.currentAnimateState === state) return;

    this.currentAnimateState = state;

    this.removeChild(this.hero);

    if (this.hero instanceof AnimatedSprite) {
      this.hero.stop();
    }

    switch (state) {
      case 'stay':
        this.hero = this.heroAnimations.stayAnimation();
        this.setBulletPointShift(50, -45);
        break;
      case 'lay':
        this.hero = this.heroAnimations.layAnimation();
        this.setBulletPointShift(40, -20);
        break;
      case 'run':
        this.hero = this.heroAnimations.moveAnimation();
        this.setBulletPointShift(50, -45);
        break;
      case 'jump':
        this.hero = this.heroAnimations.jumpAnimation();
        this.setBulletPointShift(0, -20);
        break;
      case 'runUp':
        this.hero = this.heroAnimations.runUpAnimation();
        this.setBulletPointShift(40, -70);
        break;
      case 'runDown':
        this.hero = this.heroAnimations.runDownAnimation();
        this.setBulletPointShift(40, -20);
        break;
      case 'stayUp':
        this.hero = this.heroAnimations.stayUpAnimation();
        this.setBulletPointShift(10, -95);
        break;
      case 'runAndShoot':
        this.hero = this.heroAnimations.runShootAnimation();
        this.setBulletPointShift(50, -45);
        break;
      default:
        this.hero = this.heroAnimations.stayAnimation();
    }

    if (this.hero instanceof Sprite || this.hero instanceof AnimatedSprite) {
      this.hero.anchor.set(0.5, 1);
    }

    //this.hero.anchor.set(0.5, 1);
    this.hero.position.set(0, 0);
    this.addChild(this.hero);
  }

  public update(): void {
    if (this.isDead) return;

    if (this.isInvincible) {
      this.alpha = Math.floor(Date.now() / 100) % 2 === 0 ? 0.5 : 1;
    } else {
      this.alpha = 1;
    }

    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
    this.flyDown();
    this.updateAnimations();
  }

  public stay(): void {
    this.velocityY = 0;
    this.isGrounded = true;
  }

  public swimming(): void {
    this.isSwimming = true;
    this.isGrounded = true;
  }

  public moveLeft(): void {
    this.isLie = false;
    this.movement.x = -1;
    this.scale.x = -0.7;
    this.isFlipped = true;
  }

  public moveRight(): void {
    this.isLie = false;
    this.movement.x = 1;
    this.scale.x = 0.7;
    this.isFlipped = false;
  }

  public stop(): void {
    this.movement.x = 0;
  }

  public jump(): void {
    if (!this.isGrounded || this.isLie || this.isSwimming) return;

    this.velocityY -= this.JUMP_FORCE;
    this.isGrounded = false;
  }

  public lieDown(): void {
    if (!this.isGrounded || this.isSwimming) {
      this.standUp();
      return;
    }

    this.isLie = true;
    this.movement.x = 0;
  }

  public standUp(): void {
    this.isLie = false;
  }

  public jumpOff(): void {
    if (!this.isGrounded || this.isSwimming) return;
    this.isGrounded = false;
    this.y += 2;
  }

  private updateAnimations(): void {
    let state = 'stay';

    if (this.isLie) {
      state = 'lay';
    } else if (!this.isGrounded) {
      state = 'jump';
    } else if (this.runUp) {
      state = 'runUp';
    } else if (this.runDown) {
      state = 'runDown';
    } else if (this.runAndShoot) {
      state = 'runAndShoot';
    } else if (this.movement.x !== 0) {
      state = 'run';
    } else if (this.stayUp) {
      state = 'stayUp';
    } else {
      state = 'stay';
    }

    this.setAnimation(state);
  }

  public flyDown(): void {
    if (this.velocityY > 0 && !this.isGrounded) {
      this.isFlyDown = true;
    } else {
      this.isFlyDown = false;
    }
  }

  public get bulletContext(): IBulletContext {
    this.bulletPosition.x = this.x + this.bulletPointShift.x;
    this.bulletPosition.y = this.y + this.bulletPointShift.y;
    this.bulletPosition.angle = this.isFlipped ? this.bulletAngle * -1 + 180 : this.bulletAngle;

    return this.bulletPosition;
  }

  public setBulletAngle(angle: number): void {
    //console.log(angle);
    this.bulletAngle = angle;
  }

  public fire(): void {
    if (this.isDead) return;
    const now = Date.now();
    if (now - this.recharge < this.rechargeTime) return;

    //this.bulletFactory.createBullet(this.bulletContext);
    this.weapon.currentGun(this.bulletContext);
    this.recharge = now;
  }

  public respawnHero(vx: number): void {
    this.GRAVITY_FORCE = 0.1;
    this.x = vx;
    this.y = 100;

    this.velocityX = 0;
    this.velocityY = 0;
    this.movement.x = 0;
    this.isDead = false;
    this.isGrounded = false;
    this.isLie = false;
    this.runUp = false;
    this.runDown = false;
    this.runAndShoot = false;
    this.isSwimming = false;
    this.scale.x = 0.7;

    this.visible = true;
    this.isInvincible = true;

    setTimeout(() => {
      this.isInvincible = false;
    }, 3000);
  }

  public killHero(): void {
    if (this.isDead || this.isInvincible) return;
    this.isDead = true;
    this.HP -= 1;
    this.visible = false;
    this.weapon.setWeapon(1);
    this.rechargeTime = 200;
  }
}
