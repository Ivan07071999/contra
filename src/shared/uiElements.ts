import { ButtonContainer, Input } from "@pixi/ui";
import { Container, TextStyle, Text, Texture, Sprite, Graphics } from "pixi.js";
import playImg from '../../public/volume_up.png';
import muteImg from '../../public/volume_off.png';

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

    const background = new Graphics().roundRect(0, 0, 200, 50, 5).fill(0xffffff);

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
    const keyDescription = document.createElement('small');
    wrapper.className = 'description';
    keyView.className = 'key';
    keyDescription.className = 'keyDescription';

    keyView.textContent = key;
    keyDescription.textContent = description.toUpperCase();
    wrapper.append(keyDescription, keyView);

    return wrapper;
  }

  public createAudioElement(): HTMLButtonElement {
    const buttonAudio = document.createElement('button');
    buttonAudio.className = 'audio';
    const img = document.createElement('img');
    img.className = 'backgroundImg';
    img.src = muteImg;
    buttonAudio.appendChild(img);

    return buttonAudio;
  }

  public createRangeInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'range';
    input.value = '0';
    input.className = 'rangeInp';
    return input;
  }

  public setImg(button: HTMLButtonElement, state: string): void {
    if (button.firstChild instanceof HTMLImageElement) {
      button.firstChild.src = state === 'play' ? playImg : muteImg;
    }
  }

  public createMenuButton(callback: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'menu';
    button.textContent = 'MENU';
    button.addEventListener('click', () => {
      callback();
    })

    return button;
  }
}
