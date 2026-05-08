import { Container, TextStyle, Text } from "pixi.js";

export class StartButton extends Container {
  declare public startButton: Text;

  constructor() {
    super();
    this.createButton('Start game');
  }

  private createButton(text: string): void {
    const style = new TextStyle({
      fontFamily: 'Impact',
      fontSize: 40,
      fill: 0xffffff,
      stroke: {
        color: 0xff2222,
        width: 4,
      },
      letterSpacing: 5,
      align: 'center',
    });

    this.startButton = new Text({
      text: text,
      style: style,
    });

    this.cursor = 'pointer';
    this.eventMode = 'static';
    this.startButton.anchor.set(0.5);

    this.addChild(this.startButton);
  }
}
