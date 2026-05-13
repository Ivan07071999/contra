import { Application } from 'pixi.js';
import { initDevtools } from '@pixi/devtools';
import { Playground } from '../widgets/playground';
import { Collisions } from '../features/collisions';
import { Controller } from '../features/controller';
import { Background } from '../widgets/background';
import type { ISpriteAtlas } from '../shared/types';
import { SoundManager } from '../shared/soundManager';
import { StartScreen } from '../pages/startScreen';
import { KeysSwitcher } from '../shared/keysSwitcher';
import { Options } from '../pages/options';
import { UIElements } from '../shared/uiElements';
import { Panel } from '../entities/panel';

export class Game {
  private app: Application;
  private startScreen: StartScreen;
  declare private atlasData: ISpriteAtlas;
  declare private background: Background | null;
  declare private playground: Playground | null;
  declare private collisions: Collisions | null;
  declare private controller: Controller | null;
  declare private soundManager: SoundManager;
  declare private keysSwitcher: KeysSwitcher;
  private UIElements: UIElements;
  private options: Options;
  declare private panel: Panel;

  constructor(atlasData: ISpriteAtlas) {
    this.atlasData = atlasData;
    this.soundManager = SoundManager.getInstance();
    this.UIElements = new UIElements();
    this.app = new Application();
    this.startScreen = new StartScreen(this.UIElements, this.startGame, this.openOptions);
    this.keysSwitcher = new KeysSwitcher();
    this.options = new Options(this.keysSwitcher, this.UIElements, this.openStartScreen);
    this.panel = new Panel(this.keysSwitcher, this.UIElements, this.soundManager, this.backToMenu);
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
    //this.openStartScreen();
    this.startGame();
  }

  private openOptions = (): void => {
    this.startScreen.removeFromParent();
    this.app.stage.addChild(this.options);
    this.options.createInputs();
  };

  private openStartScreen = (): void => {
    this.app.stage.removeChildren();
    this.app.stage.addChild(this.startScreen);
  };

  private backToMenu = (): void => {
    this.soundManager.stopBgMusic();
    this.stopLoop();
    this.openStartScreen();
    this.playground = null;
    this.collisions = null;
    this.controller = null;
    this.background = null;
  };

  private startGame = (): void => {
    this.playground = new Playground(this.atlasData, this.soundManager);
    this.collisions = new Collisions(this.soundManager);
    this.controller = new Controller(this.playground.hero, this.keysSwitcher);
    this.soundManager.playBgMusic();
    this.background = new Background(this.app);
    this.app.stage.removeChild(this.startScreen);
    this.app.stage.addChild(this.background.view, this.playground.view);
    this.startLoop();
  };

  private update(): void {
    if (!this.playground || !this.collisions) return;
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
    if (!this.playground || !this.collisions || !this.background) return;
    const heroPosition = -this.playground.hero.x + 200;

    if (this.playground.hero.x >= this.playground.boss.x - this.playground.boss.width * 1.35) {
      return;
    }

    if (heroPosition > this.playground.position) {
      return;
    }

    this.playground.position = heroPosition;
    this.background.position = heroPosition;
    this.playground.HPPosition = -heroPosition;
  }

  private gameLoopTicker = () => {
    if (!this.controller) return;
    this.controller.update();
    this.update();
    this.updateCamera();
  };

  private startLoop(): void {
    this.app.ticker.remove(this.gameLoopTicker);
    this.app.ticker.add(this.gameLoopTicker);
  }

  private stopLoop(): void {
    this.app.ticker.remove(this.gameLoopTicker);
  }
}
