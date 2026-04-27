import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';
import { Playground } from '../widgets/playground';
import { Collisions } from '../features/collisions';
import { Controller } from '../features/controller';
import { Background } from '../widgets/background';
import type { ISpriteAtlas } from '../shared/types';
import { Hero } from '../entities/hero';

export class Game {
  private app: Application;
  private hero: Hero;
  private atlasData: ISpriteAtlas;
  private background!: Background;
  private playground: Playground;
  private collisions: Collisions;
  private controller: Controller;

  constructor(atlasData: ISpriteAtlas) {
    this.app = new Application();
    this.atlasData = atlasData;
    this.hero = new Hero(this.atlasData);
    this.playground = new Playground(this.atlasData, this.hero);
    this.collisions = new Collisions();
    this.controller = new Controller(this.hero);
    this.hero.x = 200;
    this.hero.y = 100;

    console.log(this.hero.width, this.hero.height);
  }

  public async init(): Promise<void> {
    await this.app.init({
      width: 800,
      height: 600,
      background: '#000000',
      antialias: true,
    });

    await initDevtools(this.app);

    const container = document.querySelector('#app');
    container?.appendChild(this.app.canvas);
    this.background = new Background(this.app);

    this.playground.view.addChild(this.hero);
    this.app.stage.addChild(this.background.view, this.playground.view);
    this.startLoop();
  }

  private update(): void {
    const prevPoint = {
      x: this.hero.x,
      y: this.hero.y,
    };

    this.hero.update();
    this.playground.update(this.hero);

    if (this.hero.y > this.app.screen.height) {
      this.hero.y = this.app.screen.height;
      this.hero.swimming();
    }

    this.collisions.resolvePlatformsCollisions(this.hero, this.playground.platforms, prevPoint);
    this.collisions.resolveEnemiesCollisions(this.playground.enemies, this.playground.platforms )
    this.collisions.resolveBoxesCollisions(this.hero, this.playground.boxes);
    this.collisions.resolveBoxesCollisions(this.hero, this.playground.bridges);
    this.collisions.resolveBoxesCollisions(this.hero, this.playground.secondBridges);
    this.collisions.resolveBulletsForEnemiesCollisions(this.playground.bullets, this.playground.enemies);
    // console.log(this.hero.isSwimming);
  }

  private updateCamera(): void {
    //const heroPosition = -6500
    const heroPosition = -this.hero.x + 200;

    if (heroPosition > 0) return;

    this.playground.position = heroPosition;
    this.background.position = heroPosition;
  }

  private startLoop(): void {
    this.app.ticker.add(() => {
      this.controller.update();
      this.update();
      this.updateCamera();
    });
  }
}
