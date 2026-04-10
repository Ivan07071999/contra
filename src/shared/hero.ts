import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js';
import { HeroAnimations } from '../features/heroAnimation';
import type { ISpriteAtlas } from './types';

export class Hero extends Container {
  private heroAnimations: HeroAnimations;
  private hero: Sprite | AnimatedSprite;
  private GRAVITY_FORCE = 0.1;
  private JUMP_FORCE = 5;
  private SPEED = 2;
  private velocityX = 0;
  public velocityY = 0;
  private movement = { x: 0, y: 0 };
  private directionContext = { left: 0, right: 0 };
  public isGrounded = false;
  private isLie = false;
  public isFlyDown = false;
  private currentAnimateState = 'stay';

  constructor(atlasData: ISpriteAtlas) {
    super();

    this.heroAnimations = new HeroAnimations(atlasData);
    this.hero = new Sprite(Texture.WHITE);
    this.setAnimation('jump');

    this.addChild(this.hero);
    this.scale.set(0.7);
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
        break;
      case 'lay':
        this.hero = this.heroAnimations.layAnimation();
        break;
      case 'run':
        this.hero = this.heroAnimations.moveAnimation();
        break;
      case 'jump':
        this.hero = this.heroAnimations.jumpAnimation();
        break;
      default:
        this.hero = this.heroAnimations.stayAnimation();
    }

    this.hero.anchor.set(0.5, 1);
    this.hero.position.set(0, 0);
    this.addChild(this.hero);

    console.log(this.currentAnimateState);
  }

  public update(): void {
    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
    this.flyDown();
  }

  public stay(): void {
    this.velocityY = 0;
    this.isGrounded = true;
    this.setAnimation('stay');
  }

  public moveLeft(): void {
    this.isLie = false;
    this.directionContext.left = -1;
    this.movement.x = -1;
    if (this.isGrounded) {
      this.setAnimation('run');
    };
  }

  public moveRight(): void {
    this.isLie = false;
    this.directionContext.right = 1;
    this.movement.x = 1;
    if (this.isGrounded) {
      this.setAnimation('run');
    }
  }

  public stop(): void {
    this.movement.x = 0;
    //this.setAnimation('stay');
  }

  public jump(): void {
    if (!this.isGrounded || this.isLie) return;

    this.velocityY -= this.JUMP_FORCE;
    this.isGrounded = false;
    this.setAnimation('jump');
  }

  public lieDown(): void {
    if (!this.isGrounded) {
      this.standUp();
      return;
    };

    this.isLie = true;
    this.setAnimation('lay')
  }

  public standUp(): void {
    this.isLie = false;
    this.setAnimation('stay')
  }

  public jumpOff(): void {
    this.isGrounded = false;
    this.y += 2;
  }

  public flyDown(): void {
    if (this.velocityY > 0 && !this.isGrounded) {
      this.isFlyDown = true;
    } else {
      this.isFlyDown = false;
    }
  }
}
