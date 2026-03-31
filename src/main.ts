import './style.css';
import { Game } from './app/game';

void (async () => {
  const game = new Game();
  await game.init();
})();
