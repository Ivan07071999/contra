import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';
import { Hero } from '../shared/hero';
import { Playground } from '../widgets/playground';
import { Collisions } from '../features/collisions';
import { Controller } from '../features/controller';
import { Background } from '../widgets/background';

export class Game {
  private app: Application;
  private hero: Hero;
  private background!: Background;
  private playground: Playground;
  private collisions: Collisions;
  private controller: Controller;

  constructor() {
    this.app = new Application();
    this.playground = new Playground();
    this.hero = new Hero();
    this.collisions = new Collisions();
    this.controller = new Controller(this.hero)
    this.hero.x = 200;
    this.hero.y = 100;
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

    this.playground.view.addChild(this.hero)
    this.app.stage.addChild(this.background.view, this.playground.view);
    this.startLoop();
  }

  private update() {
    const prevPoint = {
      x: this.hero.x,
      y: this.hero.y,
    }

    this.hero.update();

    if (this.hero.y > this.app.screen.height) this.hero.y = this.app.screen.height;

    this.collisions.resolvePlatformsCollisions(this.hero, this.playground.platforms, prevPoint);
  }

  updateCamera(): void {
    const heroPosition = -this.hero.x + 200;
    this.playground.position = heroPosition;
    this.background.position = heroPosition;
    // this.playground.position = -2500
  }

  private startLoop(): void {
    this.app.ticker.add(() => {
      this.controller.update();
      this.update();
      this.updateCamera();
    });
  }
}
