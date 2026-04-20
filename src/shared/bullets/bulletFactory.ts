import { Bullet } from "./bullet";

export class BulletFactory {

  public createBullet(x: number, y: number): Bullet {
    const bullet = new Bullet();

    bullet.x = x + 20;
    bullet.y = y - 40;

    return bullet;
  }
}
