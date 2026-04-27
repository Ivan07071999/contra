import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import type { Hero } from "./hero";
import type { IBulletContext } from "../shared/types";
import type { BulletFactory } from "../shared/bullets/bulletFactory";
import type { PlaygroundAnimations } from "../features/playgroundAnimations";

export class Tourelle extends Container {
  declare private tourelleGun: Sprite | AnimatedSprite;
  private animation: PlaygroundAnimations;
  private bulletFactory: BulletFactory;
  private target: Hero;
  private isDead = false;
  private recharge = 0;
  public HP = 5;

  constructor(
    bulletfactory: BulletFactory,
    target: Hero,
    x: number,
    y: number,
    animation: PlaygroundAnimations,
  ) {
    super();

    this.bulletFactory = bulletfactory;
    this.animation = animation;
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
    if (this.isDead) return;
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

  public destroyTourelle(): void {
    if (this.isDead || this.HP > 0) return;

    this.isDead = true;
    this.removeChild(this.tourelleGun);

    const explosion = this.animation.explosionAnimation();

    explosion.onComplete = () => {
      //this.removeFromParent();
      this.tourelleGun.removeFromParent()
    };

    this.tourelleGun = explosion;
    this.addChild(this.tourelleGun);
  }
}
