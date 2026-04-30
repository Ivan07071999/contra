import { Container, Sprite, Texture } from "pixi.js";

import type { ISpriteAtlas } from "../shared/types";
import { PlaygroundAnimations } from "../features/playgroundAnimations";
import { BossWeapons } from "../shared/bossWeapons";
import { BossDoor } from "../shared/bossDoor";
import type { BulletFactory } from "../shared/bullets/bulletFactory";

export class Boss extends Container {
  private animations: PlaygroundAnimations;
  public bossWeapons: BossWeapons;
  public bossDoor: BossDoor;

  constructor(atlasData: ISpriteAtlas, bulletFactory: BulletFactory) {
    super();

    this.animations = new PlaygroundAnimations(atlasData);
    this.bossWeapons = new BossWeapons(this.animations, bulletFactory);
    this.bossDoor = new BossDoor(this.animations);

    this.createBoss();
  }

  private createBoss(): void {
    const bossTexture = Texture.from('boss0000');
    const bossSprite = new Sprite(bossTexture);

    bossSprite.scale.set(0.7);
    this.scale.set(1.3);

    this.position.set(6910, 180);
    //this.position.set(500, 180);
    this.addChild(
      bossSprite,
      this.bossDoor,
      this.bossWeapons.bossWeapons[0],
      this.bossWeapons.bossWeapons[1],
    );
  }

  public update(): void {
    if (this.bossDoor.HP === 0) {
      this.bossWeapons.bossGunHP = [0, 0];
    }

    this.bossWeapons.update();
    this.bossDoor.update();
  }
}
