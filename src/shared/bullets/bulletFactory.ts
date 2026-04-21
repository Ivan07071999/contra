import type { IBulletContext } from "../types";
import { Bullet } from "./bullet";

export class BulletFactory {

  public createBullet(bulletContext: IBulletContext): Bullet {
    const bullet = new Bullet(bulletContext.angle * Math.PI / 180);

    bullet.x = bulletContext.x + 20;
    bullet.y = bulletContext.y - 40;

    return bullet;
  }
}
