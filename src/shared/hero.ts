import { Container, Graphics } from 'pixi.js';
import { Controller } from '../features/controller';

export class Hero extends Container {
  private GRAVITY_FORCE = 0.1;
  private volocityX = 0;
  private velocityY = 0;
  private graphic: Graphics;
  public controller: Controller;
  public vx = 100;
  public vy = 340;
  public isGrounded = true;

  constructor() {
    super();

    this.graphic = new Graphics()
      .moveTo(50, 50)
      .lineTo(100, 50)
      .lineTo(100, 150)
      .lineTo(50, 150)
      .lineTo(50, 50)
      .stroke({ color: 'red', pixelLine: true });

    this.graphic.position.set(this.vx, this.vy);
    this.controller = new Controller();

    this.addChild(this.graphic);
  }

  public update(): void {
    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }

  public stay(): void {
    this.velocityY = 0;
  }
}
