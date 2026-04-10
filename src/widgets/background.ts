import { Application, Container, Texture, TilingSprite } from "pixi.js";
import { Mountain } from "../shared/mountain";
import levelData from '../shared/platforms.json';
import { TextureCreator } from "../features/texture";

export class Background {
  public view: Container;
  public mountains: Container;
  public jungle: Container;
  private textureCreator: TextureCreator;
  private stars: TilingSprite;

  constructor(app: Application) {
    this.view = new Container();
    this.mountains = new Container();
    this.jungle = new Container();
    this.textureCreator = new TextureCreator();
    this.stars = this.textureCreator.createStars(app);

    this.addStars();
    this.addMountains();
    this.addJungle();
  }

  private addMountains() {
    for (const mountain of levelData.mountains) {
      const item = new Mountain(mountain.x, mountain.count);
      this.mountains.addChild(item);
    }

    this.view.addChild(this.mountains);
  }

  private addStars(): void {
    this.mountains.addChild(this.stars);
  }

  private addJungle(): void {
    const jungleTopTexture = Texture.from('jungletop0000');
    const jungleBottomTexture = Texture.from('junglebottom0000');

    const jungleTopTilingSprite = new TilingSprite({
      texture: jungleTopTexture,
      width: 5850 - 2895,
      height: jungleTopTexture.height / 2,
      tileScale: { x: 0.5, y: 0.5 },
    });

    const jungleBottomTilingSprite = new TilingSprite({
      texture: jungleBottomTexture,
      width: 5850 - 2895,
      height: 600 - jungleBottomTexture.height / 2,
      tileScale: { x: 0.5, y: 0.5 },
    });

    jungleBottomTilingSprite.y = jungleTopTexture.height / 2;

    jungleTopTilingSprite.x = 2895;
    jungleBottomTilingSprite.x = 2895;

    this.jungle.addChild(jungleTopTilingSprite, jungleBottomTilingSprite);
    this.view.addChild(this.jungle);
  }

  public get position(): number {
    return this.view.x;
  }

  public set position(value: number) {
    this.view.x = value;
  }
}
