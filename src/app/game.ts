import { Application } from 'pixi.js';

export class Game {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  public async init(): Promise<void> {

    await this.app.init({
      background: '#000000',
      resizeTo: window,
      antialias: true,
    });

    const container = document.querySelector('#app');
    container?.appendChild(this.app.canvas);
  }
}
