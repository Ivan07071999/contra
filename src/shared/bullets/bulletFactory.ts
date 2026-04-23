import type { IBulletContext } from "../types";
import { Bullet } from "./bullet";

export class BulletFactory {

  public createBullet(bulletContext: IBulletContext): Bullet {
    const bullet = new Bullet(bulletContext.angle * Math.PI / 180);

    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;

    return bullet;
  }
}
