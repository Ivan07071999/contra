import './style.css';
import { Game } from './app/game';
import { AssetsManager } from './shared/assetsManager';

void (async () => {
  const assets = new AssetsManager();
  await assets.load();

  if (!assets.atlasData) return;

  const game = new Game(assets.atlasData);
  await game.init();
})();
