import type { Container, Rectangle } from 'pixi.js';
import type { Platform } from '../shared/platform';
import { Hero } from '../shared/hero';

export class Collisions {

  public checkCollision(
    firstContainer: Rectangle | Container,
    secondContainer: Rectangle | Container,
  ) {
    const bounds1 = firstContainer.getBounds();
    const bounds2 = secondContainer.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }

  public resolvePlatformsCollisions(
    hero: Hero,
    platforms: Platform[] = [],
    heroPosition: { x: number; y: number },
  ) {

    if (!hero.isGrounded && !hero.isFlyDown) return;

    for (const platform of platforms) {
      if (!this.checkCollision(hero, platform)) continue;

      const currentY = hero.y;
      hero.y = heroPosition.y;

      if (!this.checkCollision(hero, platform)) {

        hero.stay();
        continue;
      };

      hero.y = currentY;
      //hero.x = heroPosition.x;
    }
  }
}
