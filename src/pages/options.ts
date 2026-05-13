import { Container, Sprite, Text, Texture } from "pixi.js";
import type { UIElements } from "../shared/uiElements";
import type { KeysSwitcher } from "../shared/keysSwitcher";
import { ButtonContainer, Input } from "@pixi/ui";
import type { IKeys } from "../shared/types";

export class Options extends Container {
  private UIElements: UIElements;
  private keysSwitcher: KeysSwitcher;
  private inputsContainer: Container;
  declare private saveButton: ButtonContainer;
  private inputs: Input[] = [];

  private openStartScreen: () => void;

  constructor(keysSwitcher: KeysSwitcher, UIElements: UIElements, openStartScreen: () => void) {
    super();

    this.UIElements = UIElements;
    this.keysSwitcher = keysSwitcher;
    this.inputsContainer = new Container();
    this.saveButton = new ButtonContainer();
    this.addChild(this.inputsContainer);
    this.openStartScreen = openStartScreen;

    this.createOptionWrapper();
    this.createInputsContainer();
    this.createBackButton();
    this.createSaveButton();
  }

  private createOptionWrapper(): void {
    const sprite = new Sprite(Texture.EMPTY);
    sprite.width = 800;
    sprite.height = 600;
    const text = new Text({
      text: 'OPTIONS',
      style: {
        fill: '#ffffff',
        fontSize: 36,
        fontFamily: 'Arial',
        align: 'center',
      },
    });

    text.x = 400 - text.width / 2;
    text.y = 10;
    this.addChild(sprite, text);
  }

  private createInputsContainer(): void {
    this.inputsContainer.x = 200;
    this.inputsContainer.y = 100;
  }

  private createBackButton(): void {
    const backButton = this.UIElements.createBackButton(this.openStartScreen);
    this.addChild(backButton);
  }

  private createInputItem(description: string, inputValue: string): Container {
    const container = new Container();
    const myText = new Text({
      text: description.toUpperCase(),
      style: {
        fill: '#ffffff',
        fontSize: 36,
        fontFamily: 'Arial',
        align: 'center',
      },
    });

    const el = this.UIElements.createInputElement(inputValue);

    el.x = 200;
    container.addChild(myText, el);
    this.addChild(container);
    return container;
  }
  public createInputs(): void {
    this.inputsContainer.removeChildren();
    this.inputs = [];
    const controller = this.keysSwitcher.keys;

    Object.entries(controller).forEach(([key, value], ind) => {
      if (!value) return;
      const input = this.createInputItem(value, key);
      input.y = ind * 60;
      this.inputsContainer.addChild(input);
      const currInp = input.children[1] as Input;

      const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        const newCode = e.code;

        this.inputs.forEach((inputItem) => {
          if (inputItem !== currInp) {
            if (inputItem.value === newCode) {
              inputItem.value = '';
            }
          }
        });

        currInp.value = newCode;

        window.removeEventListener('keydown', handleKeyDown);
        if (document.activeElement) {
          (document.activeElement as HTMLElement).blur();
        }
      };

      currInp.on('pointerdown', () => {
        window.addEventListener('keydown', handleKeyDown);
      });

      currInp.on('blur', () => {
        window.removeEventListener('keydown', handleKeyDown);
      });

      this.inputs.push(currInp);
    });
    console.log(this.inputs.length);
  }

  private createNotifications(): void {
    const myText = new Text({
      text: 'ASSIGN ALL CONTROL KEYS',
      style: {
        fill: 0xff2222,
        fontSize: 16,
        fontFamily: 'Impact',
        align: 'center',
        letterSpacing: 3,
      },
    });
    myText.x = 280;
    myText.y = 60;

    setTimeout(() => {
      myText.removeFromParent();
      myText.destroy();
    }, 3000);

    this.addChild(myText);
  }

  private createNewController(): Partial<Record<string, keyof IKeys>> | undefined {
    const newController: Partial<Record<string, keyof IKeys>> = {};
    const values = Object.values(this.keysSwitcher.keys);
    this.inputs.forEach((item, ind) => {
      const codeValue = item.value;
      console.log(codeValue);
      newController[codeValue] = values[ind];
    });

    if (Object.hasOwn(newController, '')) {
      this.createNotifications();
      return;
    }

    return newController;
  }

  private updatePanel(keys: Partial<Record<string, keyof IKeys>>): void {
    const currentKeys = document.querySelectorAll('.key');
    console.log(currentKeys[0].textContent);
    let i = 0;

    for (const key in keys) {
      currentKeys[i].textContent = key;
      i += 1;
    }
  }

  private saveOptions = (): void => {
    const controller = this.createNewController();
    if (!controller) return;

    this.keysSwitcher.keys = controller;
    this.updatePanel(controller);
    this.openStartScreen();
  };

  private createSaveButton(): void {
    const saveButton = this.UIElements.createButton(
      'SAVE OPTIONS',
      this.saveButton,
      this.saveOptions,
      500,
    );
    saveButton.x = 400 - saveButton.width / 2;
    this.addChild(saveButton);
  }
};
