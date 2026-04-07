import './style.css';
import { Game } from './app/game';
import { AssetsManager } from './shared/assetsManager';

void (async () => {
  const assets = new AssetsManager();
  await assets.load();

  const game = new Game();
  await game.init();
})();
