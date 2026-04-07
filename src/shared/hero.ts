import { Container, Graphics } from 'pixi.js';
// import { Controller } from '../features/controller';

export class Hero extends Container {
  private GRAVITY_FORCE = 0.1;
  private JUMP_FORCE = 5;
  private SPEED = 2;
  private velocityX = 0;
  public velocityY = 0;
  private movement = { x: 0, y: 0 };
  private directionContext = { left: 0, right: 0 };
  private graphic: Graphics;
  public isGrounded = true;
  private isLie = false;
  public isFlyDown = false;

  constructor() {
    super();

    this.graphic = new Graphics()
      .rect(0, 0, 25, 50)
      .stroke({ color: 'red', width: 2 })

    this.pivot.set(25, 50);
    //this.graphic.scale.set(0.5)

    this.addChild(this.graphic);
  }

  public update(): void {
    this.velocityX = this.movement.x * this.SPEED;
    this.x += this.velocityX;

    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
    //console.log(this.velocityY);
    this.flyDown();
  }

  public stay(): void {
    this.velocityY = 0;
    this.isGrounded = true;
  }

  public moveLeft(): void {
    this.isLie = false;
    this.directionContext.left = -1;
    this.movement.x = -1;
  }

  public moveRight(): void {
    this.isLie = false;
    this.directionContext.right = 1;
    this.movement.x = 1;
  }

  public stop(): void {
    this.movement.x = 0;
  }

  public jump(): void {
    console.log('Jump');

    if (!this.isGrounded || this.isLie) return;

    this.velocityY -= this.JUMP_FORCE;
    this.isGrounded = false;
  }

  public lieDown(): void {
    if (!this.isGrounded) {
      this.standUp();
      return;
    };

    this.rotation = Math.PI / 2;
    this.isLie = true;
  }

  public standUp(): void {
    this.isLie = false;
    this.rotation = 0;
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
    //console.log(this.isFlyDown, this.isGrounded);
  }
}
