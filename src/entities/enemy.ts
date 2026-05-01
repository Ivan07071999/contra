import { AnimatedSprite, Container } from 'pixi.js';
import { EnemyAnimations } from '../features/enemyAnimations';
import type { ISpriteAtlas } from '../shared/types';

export class Enemy extends Container {
  private sprite: AnimatedSprite;
  private enemyAnimation: EnemyAnimations;
  private GRAVITY_FORCE = 0.2;
  private SPEED = 1;
  private JUMP_FORCE = 5.5;
  private velocityY = 0;
  private isGround = false;
  private jumpAttempted = false;

  constructor(atlasData: ISpriteAtlas, x: number, y: number) {
    super();
    this.enemyAnimation = new EnemyAnimations(atlasData);
    this.sprite = this.enemyAnimation.moveAnimation();
    this.scale.set(0.7);
    this.scale.x = -0.7;
    this.sprite.anchor.set(0.5, 1);
    this.x = x;
    this.y = y;
    this.addChild(this.sprite);
  }

  public update(): void {
    this.x -= this.SPEED;

    if (this.velocityY > 0 && !this.jumpAttempted) {
      if (Math.random() > 0.5) this.jump();

      this.jumpAttempted = true;
    }

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  public stay(): void {
    this.isGround = true;
    this.velocityY = 0;
    this.jumpAttempted = false;
  }

  public jump(): void {
    if (!this.isGround) return;

    this.velocityY -= this.JUMP_FORCE;
    this.isGround = false;
  }

  public blowUpEnemy(): void {
    this.removeChild(this.sprite);

    const explosion = this.enemyAnimation.explosionAnimation();
    explosion.anchor.set(0.5, 1);

    explosion.onComplete = () => {
      explosion.removeFromParent();
      explosion.destroy();
    }

    this.sprite = explosion;
    this.addChild(this.sprite);
  }
}
