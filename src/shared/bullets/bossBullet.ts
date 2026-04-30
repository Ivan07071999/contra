import { Bullet } from "./bullet";

export class BossBullet extends Bullet {

  private GRAVITY_FORCE = 0.2;
  private velocityY = 0;

  public update(): void {
    this.x += this.SPEED;
    this.velocityY += this.GRAVITY_FORCE;
    this.y += this.velocityY;
  }
}
