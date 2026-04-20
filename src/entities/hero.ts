import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js';
import { HeroAnimations } from '../features/heroAnimation';
import type { ISpriteAtlas } from '../shared/types';

export class Hero extends Container {
  private heroAnimations: HeroAnimations;
  private hero: Sprite | AnimatedSprite;
  private GRAVITY_FORCE = 0.1;
  private JUMP_FORCE = 5.5;
  private SPEED = 2;
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
      case 'runUp':
        this.hero = this.heroAnimations.runUpAnimation();
        break;
      case 'runDown':
        this.hero = this.heroAnimations.runDownAnimation();
        break;
      case 'stayUp':
        this.hero = this.heroAnimations.stayUpAnimation();
        break;
      default:
        this.hero = this.heroAnimations.stayAnimation();
    }

    this.hero.anchor.set(0.5, 1);
    this.hero.position.set(0, 0);
    this.addChild(this.hero);
  }

  public update(): void {
    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
    this.flyDown();
    this.updateAnimations();
    this.isSwimming = false;
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
  }

  public moveRight(): void {
    this.isLie = false;
    this.movement.x = 1;
    this.scale.x = 0.7;
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
}
