import type { Hero } from "../entities/hero";
import type { IKeys } from "../shared/types";

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

  constructor(hero: Hero) {
    this.hero = hero;
    this.keys = {
      up: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
      right: { pressed: false },
      jump: { pressed: false },
      fire: { pressed: false },
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
    this.hero.runUp = false;
    this.hero.runDown = false;
    this.hero.stayUp = false;

    if (this.keys.up.pressed && (this.keys.left.pressed || this.keys.right.pressed)) {
      this.hero.runUp = true;
      this.hero.setBulletAngle(-45);
    } else if (this.keys.down.pressed && (this.keys.left.pressed || this.keys.right.pressed)) {
      this.hero.runDown = true;
      this.hero.setBulletAngle(45);
    } else if (this.keys.up.pressed) {
      this.hero.stayUp = true;
      this.hero.setBulletAngle(-90);
    } else if (!this.hero.isGrounded && this.keys.down.pressed) {
      this.hero.setBulletAngle(90);
    } else {
      this.hero.setBulletAngle(0);
    }

    if ((this.keys.left.pressed || this.keys.right.pressed) && this.keys.fire.pressed) {
      this.hero.runAndShoot = true;
    } else {
      this.hero.runAndShoot = false;
    }

    if (this.keys.left.pressed) {
      this.hero.moveLeft();
    } else if (this.keys.right.pressed) {
      this.hero.moveRight();
    } else {
      this.hero.stop();
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
      this.hero.fire();
    }
  }
}
