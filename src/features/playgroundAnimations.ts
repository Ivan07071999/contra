import { AnimatedSprite, type Texture } from "pixi.js";
import type { ISpriteAtlas } from "../shared/types";

export class PlaygroundAnimations {
  private atlasData: ISpriteAtlas;

  constructor(atlasData: ISpriteAtlas) {
    this.atlasData = atlasData;
  }

  public explosionAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.explosion as Texture[];
    const animation = new AnimatedSprite(frames);
    animation.animationSpeed = 0.3;
    animation.loop = false;
    animation.play();

    return animation;
  }

  public bossAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.bossdoor as Texture[];
    const animations = new AnimatedSprite(frames);
    animations.animationSpeed = 0.1;
    animations.play();

    return animations;
  }
}
