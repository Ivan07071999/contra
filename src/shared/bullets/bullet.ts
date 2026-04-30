import { Container } from 'pixi.js';

export class Bullet extends Container {
  public SPEED = 5;
  private currentAngle: number;
  declare public type: string;

  constructor(angle: number) {
    super();
    this.currentAngle = angle;
  }

  public update(): void {
    this.x += this.SPEED * Math.cos(this.currentAngle);
    this.y += this.SPEED * Math.sin(this.currentAngle);
  }
}
