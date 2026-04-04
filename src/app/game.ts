import { Application } from 'pixi.js';
import { AssetsManager } from '../shared/assets';
import { initDevtools } from '@pixi/devtools';
import { Hero } from '../shared/hero';
import { Playground } from '../widgets/playground';
import { Collisions } from '../features/collisions';
import { Controller } from '../features/controller';

export class Game {
  private app: Application;
  private assets: AssetsManager;
  private hero: Hero;
  private playground: Playground;
  private collisions: Collisions;
  private controller: Controller;

  constructor() {
    this.app = new Application();
    this.playground = new Playground();
    this.assets = new AssetsManager();
    this.hero = new Hero();
    this.collisions = new Collisions();
    this.controller = new Controller(this.hero)
  }

  public async init(): Promise<void> {
    await this.app.init({
      background: '#000000',
      resizeTo: window,
      antialias: true,
    });

    await this.assets.load();

    await initDevtools(this.app);

    const container = document.querySelector('#app');
    container?.appendChild(this.app.canvas);

    // const sheet = await Assets.load('/public/atlas.json');
    // const texture = sheet.textures['boss0000'];
    // const boss = new Sprite(texture);

    this.playground.view.addChild(this.hero)
    this.app.stage.addChild(this.playground.view);
    this.startLoop();
  }

  private update() {
    const prevPoint = {
      x: this.hero.x,
      y: this.hero.y,
    }

    this.hero.update();

    this.collisions.resolvePlatformsCollisions(this.hero, this.playground.platforms, prevPoint);
  }

  private startLoop(): void {
    this.app.ticker.add(() => {
      this.controller.update();
      this.update();
    });
  }
}
