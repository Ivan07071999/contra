import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';
import { Playground } from '../widgets/playground';
import { Collisions } from '../features/collisions';
import { Controller } from '../features/controller';
import { Background } from '../widgets/background';
import type { ISpriteAtlas } from '../shared/types';

export class Game {
  private app: Application;
  private atlasData: ISpriteAtlas;
  private background!: Background;
  private playground: Playground;
  private collisions: Collisions;
  private controller: Controller;

  constructor(atlasData: ISpriteAtlas) {
    this.app = new Application();
    this.atlasData = atlasData;
    this.playground = new Playground(this.atlasData);
    this.collisions = new Collisions();
    this.controller = new Controller(this.playground.hero);
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

    //this.playground.view.addChild(this.hero);
    this.app.stage.addChild(this.background.view, this.playground.view);
    this.startLoop();
  }

  private update(): void {
    const prevPoint = {
      x: this.playground.hero.x,
      y: this.playground.hero.y,
    };

    this.playground.hero.update();
    this.playground.update(this.playground.hero);

    if (this.playground.hero.y > this.app.screen.height) {
      this.playground.hero.y = this.app.screen.height;
      this.playground.hero.swimming();
    }

    this.collisions.resolvePlatformsCollisions(this.playground.hero, this.playground.platforms, prevPoint);
    this.collisions.resolveEnemiesCollisions(this.playground.enemies, this.playground.platforms )
    this.collisions.resolveBoxesCollisions(this.playground.hero, this.playground.boxes);
    this.collisions.resolveBoxesCollisions(this.playground.hero, this.playground.bridges);
    this.collisions.resolveBoxesCollisions(this.playground.hero, this.playground.secondBridges);
    this.collisions.resolveBulletsForEnemiesCollisions(this.playground.bullets, this.playground.enemies);
    this.collisions.resolveBulletsForTourelliesCollisions(this.playground.bullets, this.playground.tourellies)
    // console.log(this.hero.isSwimming);
  }

  private updateCamera(): void {
    //const heroPosition = -6500
    const heroPosition = -this.playground.hero.x + 200;

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
