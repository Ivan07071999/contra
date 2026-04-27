import { Container, Graphics } from 'pixi.js';

export class Bullet extends Container {
  private SPEED = 5;
  private currentAngle: number;
  declare public type: string;

  constructor(angle: number) {
    super();
    this.currentAngle = angle;

    const view = new Graphics()
      .setStrokeStyle({ width: 1, color: 'red' })
      .rect(0, 0, 5, 5)
      .stroke();

    this.addChild(view);
  }

  public update(): void {
    this.x += this.SPEED * Math.cos(this.currentAngle);
    this.y += this.SPEED * Math.sin(this.currentAngle);
  }
}
