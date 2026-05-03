import { Container, TextStyle, Text } from 'pixi.js';

export class EndGame extends Container{

  constructor(vy: number) {
    super();
    this.y = vy;
    this.zIndex = 1;
  }

  private createLabel(text: string): void {
    this.removeChildren();
    const style = new TextStyle({
      fontFamily: 'Impact',
      fontSize: 50,
      fill: 0xffffff,
      stroke: {
        color: 0x000000,
        width: 4,
      },
      letterSpacing: 30,
      align: 'center',
    });

    const label = new Text({
      text: text,
      style: style,
    });

    label.zIndex = 2;

    this.addChild(label);
  }

  public endGame(): Container {
    this.createLabel('STAGE CLEAR');
    return this;
  }

  public gameOver(): Container {
    this.createLabel('GAME OVER')
    return this;
  };
}
