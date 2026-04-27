import { Container, Sprite, Texture } from "pixi.js";
import type { Hero } from "./hero";
import type { IBulletContext } from "../shared/types";
import type { BulletFactory } from "../shared/bullets/bulletFactory";

export class Tourelle extends Container {
  private target: Hero;
  private bulletFactory: BulletFactory;
  declare private tourelleGun: Sprite;
  public HP = 5;
  private recharge = 0;

  constructor(bulletfactory: BulletFactory, target: Hero, x: number, y: number) {
    super();

    this.bulletFactory = bulletfactory;
    this.x = x;
    this.y = y;

    this.target = target;
    this.scale.set(0.7);

    this.createTourelle();
  }

  private createTourelle(): void {
    const tourelleTexture = Texture.from('tourelle0000');
    const tourelleGunTexture = Texture.from('tourellegun0000');
    const tourelle = new Sprite(tourelleTexture);
    this.tourelleGun = new Sprite(tourelleGunTexture);
    this.tourelleGun.anchor.set(0.5);
    this.tourelleGun.x = tourelle.width / 2;
    this.tourelleGun.y = tourelle.height / 2;

    this.addChild(tourelle, this.tourelleGun);
  }

  public update(): void {
    const angle = Math.atan2(this.target.y - this.y - 60, this.target.x - this.x - 30);
    this.tourelleGun.rotation = angle;

    this.fire(angle);
  }

  private fire(angle: number): void {
    this.recharge += 1;

    if (this.recharge < 50) return;

    const bulletContext: IBulletContext = {
      x: this.x + 20,
      y: this.y + 15,
      angle: (angle / Math.PI) * 180,
      type: 'enemyBullet',
    };

    this.bulletFactory.createBullet(bulletContext);
    this.recharge = 0;
  }
}
