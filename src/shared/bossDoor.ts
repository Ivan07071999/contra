import { AnimatedSprite, Container } from "pixi.js";
import { PlaygroundAnimations } from "../features/playgroundAnimations";

export class BossDoor extends Container {
  private animations: PlaygroundAnimations;
  declare public bossDoor: AnimatedSprite;
  public HP = 10;

  constructor(animations: PlaygroundAnimations) {
    super();
    this.animations = animations;

    this.createBossDoor();
  }

  private createBossDoor(): void {
    this.bossDoor = this.animations.bossAnimation();
    this.bossDoor.scale.set(0.7);
    this.bossDoor.x = 15;
    this.bossDoor.y = 200;

    this.addChild(this.bossDoor);
  }

  private destroyDoor(): void {
    const currentScale = this.bossDoor.scale.x;

    const centerX = this.bossDoor.x + this.bossDoor.width / 2;
    const centerY = this.bossDoor.y + this.bossDoor.height / 2;

    this.bossDoor.removeFromParent();

    const explosion = this.animations.explosionAnimation();
    explosion.anchor.set(0.5, 0.5);
    explosion.position.set(centerX, centerY);
    explosion.scale.set(currentScale);

    this.addChild(explosion);

    explosion.onComplete = () => {
      this.removeFromParent();
      explosion.destroy();
    };
  }

  public update(): void {
    if (this.HP === 0) this.destroyDoor();
  }
}
