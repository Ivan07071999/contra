import { AnimatedSprite, Container, Graphics, Sprite, Texture } from 'pixi.js';
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

  public runShootAnimation(): Container {
    const container = new Container();

    const upperPart = new Sprite(Texture.from('stay0000'));

    upperPart.pivot.set(upperPart.width / 2, upperPart.height);
    upperPart.position.set(10, 0);

    const upperMask = new Graphics();
    upperMask
      .rect(-upperPart.width / 2, -upperPart.height, upperPart.width, upperPart.height - 45)
      .fill({ color: 0xffffff });

    upperPart.mask = upperMask;

    const frames = this.atlasData.animations.run as Texture[];
    const animation = new AnimatedSprite(frames);

    animation.pivot.set(animation.width / 2, animation.height);
    animation.position.set(0, 0);
    animation.animationSpeed = 0.1;
    animation.play();

    const lowerMask = new Graphics();
    lowerMask
      .rect(-animation.width / 2, -(animation.height - 45), animation.width, animation.height - 45)
      .fill({ color: 0xffffff });

    animation.mask = lowerMask;

    container.addChild(upperMask, lowerMask, upperPart, animation);

    return container;
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
