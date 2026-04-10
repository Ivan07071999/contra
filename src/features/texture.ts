import { Application, Graphics, TilingSprite } from "pixi.js";

export class TextureCreator {

  public createStars(app: Application): TilingSprite {
    const graphic = new Graphics();

    for (let i = 0; i < 50; i += 1) {
      const x = Math.random() * 2885;
      const y = Math.random() * 300;
      const starSize = Math.random() * 1.5;

      graphic.circle(x, y, starSize);
    }

    graphic.fill({ color: 0xffffff });
    const texture = app.renderer.generateTexture(graphic);
    const stars = new TilingSprite({
      texture: texture,
      width: 2900,
      height: app.screen.height / 2 + 50,
    });

    return stars;
  }
};
