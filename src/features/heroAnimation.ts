import { AnimatedSprite, Sprite, Texture } from 'pixi.js';
import type { ISpriteAtlas } from '../shared/types';

export class HeroAnimations {
  private atlasData: ISpriteAtlas;

  constructor(atlasData: ISpriteAtlas) {
    this.atlasData = atlasData;
  }

  public stayAnimation(): Sprite {
    return new Sprite(Texture.from('stay0000'));
  }

  public stayUpAnimation(): Sprite {
    return new Sprite(Texture.from('stayup0000'));
  }

  public layAnimation(): Sprite {
    return new Sprite(Texture.from('lay0000'));
  }

  public moveAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.run as Texture[];
    const animation = new AnimatedSprite(frames);
    animation.animationSpeed = 0.1;
    animation.play();

    return animation;
  }

  public jumpAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.jump as Texture[];
    const animation = new AnimatedSprite(frames);
    animation.animationSpeed = 0.1;
    animation.play();

    return animation;
  }

  public runUpAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.runup as Texture[];
    const animations = new AnimatedSprite(frames);
    animations.animationSpeed = 0.1;
    animations.play();

    return animations;
  }

  public runDownAnimation(): AnimatedSprite {
    const frames = this.atlasData.animations.rundown as Texture[];
    const animations = new AnimatedSprite(frames);
    animations.animationSpeed = 0.1;
    animations.play();

    return animations;
  }
}
