import { ButtonContainer, Input } from "@pixi/ui";
import { Container, TextStyle, Text, Texture, Sprite, Graphics } from "pixi.js";

export class UIElements {
  declare public buttonStart: ButtonContainer;
  declare public buttonOption: ButtonContainer;
  declare public buttonBack: ButtonContainer;

  public createButton(
    text: string,
    button: ButtonContainer,
    callback: () => void,
    position = 0,
  ): Container {
    const view = new Container();
    const style = new TextStyle({
      fontFamily: 'Impact',
      fontSize: 40,
      fill: 'black',
      stroke: {
        color: 0xff2222,
        width: 4,
      },
      letterSpacing: 5,
      align: 'center',
    });

    const buttonText = new Text({
      text: text,
      style: style,
    });

    button = new ButtonContainer();
    button.y = position;
    button.addChild(buttonText);

    button.cursor = 'pointer';
    button.eventMode = 'static';
    button.onPress.connect(() => {
      callback();
    });

    view.addChild(button);
    return view;
  }

  public createBackButton(callback: () => void): ButtonContainer {
    const button = new ButtonContainer();
    const texture = Texture.from('arrowBack');
    const arrow = new Sprite(texture);
    arrow.scale.set(0.3);

    button.addChild(arrow);
    button.onPress.connect(() => {
      callback();
    });

    return button;
  }

  public createInputElement(initialValue: string): Input {
    const textStyle = new TextStyle({
      fill: 0x000000,
      fontSize: 24,
      fontFamily: 'Arial',
      align: 'center',
    });

    const background = new Graphics()
      .roundRect(0, 0, 200, 50, 5)
      .fill(0xffffff);

    const input = new Input({
      bg: background,
      textStyle: textStyle,
      placeholder: '...',
      value: initialValue,
      padding: 10,
      maxLength: 16,
    });

    input.eventMode = 'dynamic';

    return input;
  }

  public createKeyItemView(description: string, key: string): HTMLDivElement {
    const wrapper = document.createElement('div');
    const keyView = document.createElement('small');
    const keyDescription = document.createElement('strong');

    keyView.textContent = key;
    keyDescription.textContent = description;
    wrapper.append(keyDescription, keyView);

    return wrapper;
  }
}
