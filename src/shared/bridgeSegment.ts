import { Container, Sprite, AnimatedSprite, Texture } from "pixi.js";
import type { PlaygroundAnimations } from "../features/playgroundAnimations";

export class Bridge extends Container {
  private texture: Texture;
  private sprite: Sprite | AnimatedSprite;
  public isBlowUp = false;
  private animation: PlaygroundAnimations;

  constructor(x: number, y: number, animation: PlaygroundAnimations) {
    super();

    this.x = x;
    this.y = y;
    this.animation = animation;

    this.texture = Texture.from('bridge0000');
    this.sprite = new Sprite(this.texture);
    this.sprite.scale.set(0.5);

    this.addChild(this.sprite);
  }

  public blowUpSegment(): void {
    if (this.isBlowUp) return;
    this.removeChild(this.sprite);

    const explosion = this.animation.explosionAnimation();

    explosion.onComplete = () => {
      this.removeChild(explosion);
      this.isBlowUp = true;
    };

    this.sprite = explosion;
    this.addChild(this.sprite);
  }
}
