import type { BulletFactory } from "./bullets/bulletFactory";
import type { IBulletContext } from "./types";

export class Weapon {
  private bulletFactory: BulletFactory;
  public currentGun: (bulletContext: IBulletContext) => void;

  constructor(bulletFactory: BulletFactory) {
    this.bulletFactory = bulletFactory;
    this.currentGun = this.defaultDun;
  }

  public setWeapon(type: number): void {
    switch (type) {
      case 1:
        this.currentGun = this.defaultDun;
        break;
      case 2:
        this.currentGun = this.spreadGun;
        break;
      default:
        this.currentGun = this.defaultDun;
    }
  }

  private defaultDun = (bulletContext: IBulletContext): void => {
    this.bulletFactory.createBullet(bulletContext);
  }

  private spreadGun = (bulletContext: IBulletContext): void  => {
    let angleShift = -20;

    for (let i = 0; i < 5; i += 1) {
      const localBulletContext = {
        x: bulletContext.x,
        y: bulletContext.y,
        angle: bulletContext.angle + angleShift,
        type: bulletContext.type,
      };

      this.bulletFactory.createSpreadBullet(localBulletContext);
      angleShift += 10;
    }
  }

  public fire(bulletContext: IBulletContext): void {
    this.currentGun(bulletContext);
  }
}
