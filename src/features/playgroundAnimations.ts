import { AnimatedSprite, type Texture } from "pixi.js";
import type { ISpriteAtlas } from "../shared/types";
import type { SoundManager } from "../shared/soundManager";

export class PlaygroundAnimations {
  private atlasData: ISpriteAtlas;
  private soundManager: SoundManager;

  constructor(atlasData: ISpriteAtlas, soundManager: SoundManager) {
    this.atlasData = atlasData;
    this.soundManager = soundManager;
  }

  public moveAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.runnerrun as Texture[];
    const animations = new AnimatedSprite(frames);
    animations.animationSpeed = 0.1;
    animations.play();

    return animations;
  }

  public explosionAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.explosion as Texture[];
    const animation = new AnimatedSprite(frames);
    animation.animationSpeed = 0.3;
    animation.loop = false;
    animation.play();
    this.soundManager.playSound(this.soundManager.soundKeys.EXPLOSION);

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
