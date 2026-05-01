import { Container, Sprite, Texture } from "pixi.js";

export class WeaponBooster extends Container {
  declare private sprite: Sprite;
  private HORIZONTAL_SPEED = 3;
  private VERTICAL_SPEED = 1;
  private DIRECTION_INTERVAL = 50;
  private GRAVITY_FORCE = 0.2;
  private directionY = 1;
  private startPositionY: number;
  public isDropped = false;

  constructor(x: number, y: number) {
    super();

    this.x = x;
    this.y = y;
    this.startPositionY = x;

    this.createFlyingBooster();
    this.scale.set(0.7);
  }

  private createFlyingBooster(): void {
    const texture = Texture.from('powerup0000');
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5, 1)
    this.addChild(this.sprite);
  }

  private updateTexture(): void {
    const texture = Texture.from('spreadgun0000');
    this.sprite.texture = Texture.EMPTY;
    this.sprite.texture = texture;
  }

  public dropBooster(): void {
    this.updateTexture();
    this.isDropped = true;
  }

  public update(): void {
    if (this.isDropped) {
      this.HORIZONTAL_SPEED = 0;
      this.directionY = 1;
      this.VERTICAL_SPEED += this.GRAVITY_FORCE;
      this.y += this.VERTICAL_SPEED * this.directionY;
      return;
    }

    this.x += this.HORIZONTAL_SPEED * 0;
    this.y += this.VERTICAL_SPEED * this.directionY;

    if (this.y > this.startPositionY + this.DIRECTION_INTERVAL) {
      this.y = this.startPositionY + this.DIRECTION_INTERVAL;
      this.directionY = -1;
    } else if (this.y < this.startPositionY) {
      this.y = this.startPositionY;
      this.directionY = 1;
    }
  }
}
