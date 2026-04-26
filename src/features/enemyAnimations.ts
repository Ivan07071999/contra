import { AnimatedSprite, type Texture } from "pixi.js";
import type { ISpriteAtlas } from "../shared/types";

export class EnemyAnimations {
  private atlasData: ISpriteAtlas;

  constructor(atlasData: ISpriteAtlas) {
    this.atlasData = atlasData;
  }

  public moveAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.runnerrun as Texture[];
    const animations = new AnimatedSprite(frames);
    animations.animationSpeed = 0.1;
    animations.play();

    return animations;
  }
}
