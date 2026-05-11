import { Container, Sprite, Texture } from "pixi.js";
import { UIElements } from "../shared/uiElements";

export class StartScreen extends Container {
  public UIElements: UIElements;
  private buttonContainer: Container;
  private startGame: () => void;
  private openOption: () => void;

  constructor(UIElements: UIElements, startGame: () => void, openOption: () => void) {
    super();
    this.buttonContainer = new Container();
    this.UIElements = UIElements;
    this.startGame = startGame;
    this.openOption = openOption;
    this.createButtonContainer();
    this.createStartScreen();
  }

  private createStartScreen(): void {
    const sprite = new Sprite(Texture.from('startScreen'));
    sprite.width = 800;
    sprite.height = 600;
    this.buttonContainer.x = 100;
    this.buttonContainer.y = 400;

    this.addChild(sprite, this.buttonContainer);
  }

  private createButtonContainer(): void {
    const buttonStart = this.UIElements.createButton(
      'START GAME',
      this.UIElements.buttonStart,
      this.startGame,
    );

    const buttonOption = this.UIElements.createButton(
      'OPTIONS',
      this.UIElements.buttonOption,
      this.openOption,
      100,
    );

    this.buttonContainer.addChild(buttonStart, buttonOption);
  }
}
