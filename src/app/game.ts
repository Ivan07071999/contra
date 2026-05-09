import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';
import { Playground } from '../widgets/playground';
import { Collisions } from '../features/collisions';
import { Controller } from '../features/controller';
import { Background } from '../widgets/background';
import type { ISpriteAtlas } from '../shared/types';
import { SoundManager } from '../shared/soundManager';
import { StartScreen } from '../entities/startScreen';

export class Game {
  private app: Application;
  private startScreen: StartScreen;
  declare private atlasData: ISpriteAtlas;
  declare private background: Background;
  declare private playground: Playground;
  declare private collisions: Collisions;
  declare private controller: Controller;
  private soundManager: SoundManager | undefined;

  constructor(atlasData: ISpriteAtlas) {
    this.startScreen = new StartScreen();
    this.app = new Application();
    this.atlasData = atlasData;
    //this.startGame();
    // this.soundManager = SoundManager.getInstance();
    // this.playground = new Playground(this.atlasData, this.soundManager);
    // this.collisions = new Collisions(this.soundManager);
    // this.controller = new Controller(this.playground.hero);
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
    //this.background = new Background(this.app);

    this.startScreen.startButton.on('pointerdown', () => {
      // let audioCtx;

      // audioCtx ??= new (window.AudioContext)();
      // if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {
      //   console.error('ERROR')
      // });
      // console.log('Контекст:', audioCtx.state);
      this.startGame();
    });

    this.app.stage.addChild(this.startScreen);

    //this.app.stage.addChild(this.background.view, this.playground.view);
    //this.startLoop();
  }

  private startGame(): void {
    this.soundManager = SoundManager.getInstance();
    this.playground = new Playground(this.atlasData, this.soundManager);
    this.collisions = new Collisions(this.soundManager);
    this.controller = new Controller(this.playground.hero);
    this.soundManager.initAudioContext();
    //window.addEventListener('load', this.soundManager.ctx);
    this.soundManager.playBgMusic();
    this.background = new Background(this.app);
    this.app.stage.removeChild(this.startScreen);
    this.startScreen.destroy();
    this.app.stage.addChild(this.background.view, this.playground.view);
    this.startLoop();
  }

  private update(): void {
    const prevPoint = {
      x: this.playground.hero.x,
      y: this.playground.hero.y,
    };

    this.playground.hero.update();
    this.playground.update();

    if (this.playground.hero.y > this.app.screen.height) {
      this.playground.hero.y = this.app.screen.height;
      if (!this.playground.hero.isSwimming) this.playground.hero.killHero();
    }

    this.collisions.resolvePlatformsCollisions(
      this.playground.hero,
      this.playground.platforms,
      prevPoint,
    );
    this.collisions.resolveEnemiesCollisions(this.playground.enemies, this.playground.platforms);
    this.collisions.resolveBoxesCollisions(this.playground.hero, this.playground.boxes);
    this.collisions.resolveBoxesCollisions(this.playground.hero, this.playground.bridges);
    this.collisions.resolveBoxesCollisions(this.playground.hero, this.playground.secondBridges);
    this.collisions.resolveBulletsForEnemiesCollisions(
      this.playground.bullets,
      this.playground.enemies,
    );
    this.collisions.resolveBulletsForTourelliesCollisions(
      this.playground.bullets,
      this.playground.tourellies,
    );
    this.collisions.resolveBulletsForBossGunCollision(
      this.playground.boss.bossWeapons,
      this.playground.bullets,
    );
    this.collisions.resolveBossDoorCollision(
      this.playground.boss.bossDoor,
      this.playground.bullets,
    );
    this.collisions.resolveEnemyBulletsForHeroCollisions(
      this.playground.hero,
      this.playground.bullets,
    );
    this.collisions.resolveEnemyForHeroCollisions(this.playground.hero, this.playground.enemies);
    this.collisions.resolveBulletsForBoosterCollisions(
      this.playground.weaponBoosters,
      this.playground.bullets,
    );
    this.collisions.resolveHeroForBoostersCollisions(
      this.playground.hero,
      this.playground.weaponBoosters,
    );
    this.collisions.resolveBoostersForPlatformsCollisions(
      this.playground.weaponBoosters,
      this.playground.platforms,
    );
    this.collisions.checkIsSwimmingCollision(this.playground.hero, this.playground.water);
  }

  private updateCamera(): void {
    const heroPosition = -this.playground.hero.x + 200;

    if (this.playground.hero.x >= this.playground.boss.x - this.playground.boss.width * 1.35) {
      return;
    }

    if (heroPosition > this.playground.position) {
      return;
    }

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
