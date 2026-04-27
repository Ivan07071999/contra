import type { Container } from "pixi.js";
import type { IBulletContext } from "../types";
import { Bullet } from "./bullet";

export class BulletFactory {
  private playground: Container;
  private bullets: Bullet[];

  constructor(playground: Container, bullets: Bullet[]) {
    this.playground = playground;
    this.bullets = bullets;
  }

  public createBullet(bulletContext: IBulletContext): Bullet {
    const bullet = new Bullet((bulletContext.angle * Math.PI) / 180);

    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;

    this.playground.addChild(bullet);
    this.bullets.push(bullet);

    return bullet;
  }
}
