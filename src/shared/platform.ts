import { Container, Rectangle, Sprite, Texture } from 'pixi.js';

export class Platform extends Container {
  private tiles: Sprite[] = [];
  public bounds: Rectangle;

  constructor(x: number, y: number, width: number, height: number) {
    super();

    this.x = Math.floor(x);
    this.y = Math.floor(y);

    const platformTexture = Texture.from('platform0000');
    const groundTexture = Texture.from('ground0000');

    platformTexture.source.style.scaleMode = 'nearest';
    groundTexture.source.style.scaleMode = 'nearest';

    for (let i = 0; i < width; i += 1) {
      const tile = new Sprite(platformTexture);
      tile.scale.set(0.5);
      tile.width -= 0.5;
      tile.x = Math.floor(tile.width * i);

      this.tiles.push(tile);
      this.addChild(tile);

      for (let j = 0; j < height; j += 1) {
        const ground = new Sprite(groundTexture);
        ground.scale.set(0.5);
        ground.width -= 0.5;
        ground.height -= 0.5;
        ground.x = Math.floor(ground.width * i);
        ground.y = Math.floor(ground.height * j + ground.height);
        this.addChild(ground);
      }
    }

    this.bounds = new Rectangle(this.x, this.y, this.width, this.height);
  }
}

// export class Platform extends Container {
//   private platform: TilingSprite;
//   private ground: TilingSprite;
//   private platformTexture: Texture;
//   private groundTexture: Texture
//   public bounds: Rectangle;

//   constructor(x: number, y: number, width: number, height: number) {
//     super();
//     this.x = Math.floor(x);
//     this.y = Math.floor(y);
//     this.platformTexture = Texture.from('platform0000');
//     this.groundTexture = Texture.from('ground0000');

//     this.platformTexture.source.style.addressMode = 'repeat';
//     this.platformTexture.source.style.scaleMode = 'nearest';
//     this.groundTexture.source.style.addressMode = 'repeat';
//     this.groundTexture.source.style.scaleMode = 'nearest';

//     this.platform = new TilingSprite({
//       texture: this.platformTexture,
//       width: width,
//       height: this.platformTexture.height / 2,
//       tileScale: { x: 0.5, y: 0.5 },
//     });
//     // this.platform = new Sprite(this.platformTexture);
//     // this.platform.scale.set(0.5)
//     //this.platform.width = Math.floor(width);
//     //this.platform.height = height;

//     this.ground = new TilingSprite({
//       texture: this.groundTexture,
//       width: width,
//       height: 600 - (y + this.platform.height),
//       tileScale: { x: 0.5, y: 0.5 },
//     });

//     this.ground.y = this.platform.height;

//     this.bounds = new Rectangle(x, y, width, height);

//     this.addChild(this.platform, this.ground);
//   }
// }
