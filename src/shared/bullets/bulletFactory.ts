import { Graphics, type Container } from "pixi.js";
import type { IBulletContext } from "../types";
import { Bullet } from "./bullet";
import { BossBullet } from "./bossBullet";

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

    const view = new Graphics().circle(0, 0, 2).fill('D1C8C8');
    bullet.addChild(view);

    this.playground.addChild(bullet);
    this.bullets.push(bullet);

    return bullet;
  }

  public createSpreadBullet(bulletContext: IBulletContext): Bullet {
    const bullet = new Bullet((bulletContext.angle * Math.PI) / 180);

    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;
    bullet.SPEED = 3;

    const view = new Graphics();
    view.circle(0, 0, 4).fill(0xff2222).circle(-1, -1, 2).fill(0xdddddd);
    bullet.addChild(view);

    this.playground.addChild(bullet);
    this.bullets.push(bullet);

    return bullet;
  }

  public createBossBullet(bulletContext: IBulletContext, isDestroy: boolean): Bullet | undefined {
    if (isDestroy) return;

    const bullet = new BossBullet((bulletContext.angle * Math.PI) / 180);

    bullet.x = bulletContext.x;
    bullet.y = bulletContext.y;
    bullet.type = bulletContext.type;
    bullet.SPEED = Math.random() * -6 - 2;

    const view = new Graphics();
    view.circle(0, 0, 6).fill(0xff2222).circle(-2, -2, 3).fill(0xdddddd);

    bullet.addChild(view);

    this.playground.addChild(bullet);
    this.bullets.push(bullet);

    return bullet;
  }
}
