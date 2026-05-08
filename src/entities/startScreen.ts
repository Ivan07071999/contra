import { Container, Sprite, Texture } from "pixi.js";
import { StartButton } from "../shared/startButton";

export class StartScreen extends Container {
  public startButton: StartButton;

  constructor() {
    super();
    this.startButton = new StartButton();
    this.createStartScreen();
  }

  private createStartScreen(): void {
    const sprite = new Sprite(Texture.from('startScreen'));
    sprite.width = 800;
    sprite.height = 600;
    this.startButton.x = 200;
    this.startButton.y = 450;
    this.addChild(sprite, this.startButton);
  }
}
