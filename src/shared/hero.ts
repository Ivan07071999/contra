import { Container, Graphics } from 'pixi.js';
// import { Controller } from '../features/controller';

export class Hero extends Container {
  private GRAVITY_FORCE = 0.1;
  private JUMP_FORCE = 5;
  private SPEED = 2;
  private velocityX = 0;
  private velocityY = 0;
  private movement = { x: 0, y: 0 };
  private directionContext = { left: 0, right: 0 };
  private graphic: Graphics;
  public isGrounded = true;

  constructor() {
    super();

    this.graphic = new Graphics()
      .rect(0, 0, 50, 100)
      .stroke({ color: 'red', width: 2 })
      .circle(25, 50, 4)
      .fill({ color: 'yellow' });

    this.pivot.set(25, 50);

    this.addChild(this.graphic);
  }

  public update(): void {
    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  public stay(): void {
    this.velocityY = 0;
    this.isGrounded = true;
  }

  public moveLeft(): void {
    this.directionContext.left = -1;
    this.movement.x = -1;
  }

  public moveRight(): void {
    this.directionContext.right = 1;
    this.movement.x = 1;
  }

  public stop(): void {
    this.movement.x = 0;
  }

  public jump(): void {
    if (!this.isGrounded) return;

    this.velocityY -= this.JUMP_FORCE;
    this.isGrounded = false;
  }

  public lieDown(): void {
    this.pivot.set(50, 100);
    this.rotation = Math.PI / 2
  }

  public standUp(): void {
    this.rotation = 0;
  }

  public jumpOff(): void {
    this.isGrounded = false;
    this.y += 2;
  }
}
