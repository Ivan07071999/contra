interface IKeys {
  up: { pressed: boolean };
  down: { pressed: boolean };
  left: { pressed: boolean };
  right: { pressed: boolean };
}

export const keyMap: Record<string, keyof IKeys> = {
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowDown: 'down',
};

export class Controller {
  keys: IKeys;

  constructor() {
    this.keys = {
      up: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
      right: { pressed: false },
    };

    window.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });
    window.addEventListener('keyup', (event) => {
      this.handleKeyUp(event);
    });
  }

  handleKeyDown(event: KeyboardEvent): void {
    const key = keyMap[event.code];
    this.keys[key].pressed = true;
    console.log('Нажали:', key);
  }

  handleKeyUp(event: KeyboardEvent): void {
    const key = keyMap[event.code];

    this.keys[key].pressed = false;
    console.log('Отпустили:', key);
  }
}
