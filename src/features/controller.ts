import type { Hero } from "../entities/hero";

interface IKeys {
  up: { pressed: boolean };
  down: { pressed: boolean };
  left: { pressed: boolean };
  right: { pressed: boolean };
  jump: { pressed: boolean };
  fire: { pressed: boolean };
}

export const keyMap: Record<string, keyof IKeys | undefined> = {
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowDown: 'down',
  KeyA: 'fire',
  KeyS: 'jump',
};

export class Controller {
  public keys: IKeys;
  public hero: Hero;
  private createBullet: (() => void);

  constructor(hero: Hero, createBullet: () => void) {
    this.createBullet = createBullet;
    this.hero = hero;
    this.keys = {
      up: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
      right: { pressed: false },
      jump: { pressed: false },
      fire: { pressed: false }
    };

    window.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });

    window.addEventListener('keyup', (event) => {
      this.handleKeyUp(event);
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    const key = keyMap[event.code];

    if (!key) return;

    this.keys[key].pressed = true;
  }

  private handleKeyUp(event: KeyboardEvent): void {
    const key = keyMap[event.code];

    if (!key) return;

    this.keys[key].pressed = false;
  }

  public update() {
    if (this.keys.up.pressed && (this.keys.left.pressed || this.keys.right.pressed)) {
      this.hero.runUp = true;
    } else if (this.keys.down.pressed && (this.keys.left.pressed || this.keys.right.pressed)) {
      this.hero.runDown = true;
    } else {
      this.hero.runDown = false;
      this.hero.runUp = false;
    }

    if (this.keys.left.pressed) {
      this.hero.moveLeft();
    } else if (this.keys.right.pressed) {
      this.hero.moveRight();
    } else {
      this.hero.stop();
    }

    if (this.keys.up.pressed) {
      this.hero.stayUp = true;
    } else {
      this.hero.stayUp = false;
    }

    if (this.keys.down.pressed && !this.keys.left.pressed && !this.keys.right.pressed) {
      this.hero.lieDown();
    } else {
      this.hero.standUp();
    }

    if (this.keys.down.pressed && this.keys.jump.pressed) {
      this.hero.jumpOff();
    }

    if (this.keys.jump.pressed) {
      this.hero.jump();
    }

    if (this.keys.fire.pressed) {
      this.createBullet();
    }
  }
}
