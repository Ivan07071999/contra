import { Application, Container, Graphics, Texture, TilingSprite } from "pixi.js";

export class Background {
  public view: Container;
  public mountains!: TilingSprite;
  public stars!: TilingSprite;
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.view = new Container();
    this.stars = this.createStars();
    this.view.addChild(this.stars);
    this.addMountains();
  }

  private createStars(): TilingSprite {
    const graphic = new Graphics();

    for (let i = 0; i < 50; i += 1) {
      const x = Math.random() * 800;
      const y = Math.random() * 300;
      const starSize = Math.random() * 1.5;

      graphic.circle(x, y, starSize);
    }

    graphic.fill({ color: 0xffffff });
    const texture = this.app.renderer.generateTexture(graphic);
    const stars = new TilingSprite({
      texture: texture,
      width: this.app.screen.width,
      height: this.app.screen.height / 2 + 50,
    });

    return stars;
  }

  private addMountains() {
    const texture = Texture.from('mounts0000');

    this.mountains = new TilingSprite({
      texture: texture,
      width: 800,
      height: texture.height * 2,
      tileScale: { x: 1.5, y: 2 },
    });

    this.mountains.y = 100;

    this.view.addChild(this.mountains);
  }

  public get position(): number {
    return this.view.x;
  }

  public set position(value: number) {
    this.mountains.tilePosition.x = value * 0.1;
    this.stars.tilePosition.x = value * 0.05;
  }
}
