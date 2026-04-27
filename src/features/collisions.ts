import type { Container, Rectangle } from 'pixi.js';
import type { Platform } from '../shared/platform';
import type { Box } from '../shared/box';
import { Hero } from '../entities/hero';
import { Bridge } from '../shared/bridgeSegment';
import type { Enemy } from '../entities/enemy';
import type { Bullet } from '../shared/bullets/bullet';

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
  ): void {
    if (!hero.isGrounded && !hero.isFlyDown) return;

    for (const platform of platforms) {
      if (!this.checkCollision(hero, platform)) continue;

      const currentY = hero.y;
      hero.y = heroPosition.y;

      if (!this.checkCollision(hero, platform)) {
        hero.stay();
        continue;
      }

      hero.y = currentY;
      //hero.x = heroPosition.x;
    }
  }

  public resolveBoxesCollisions(hero: Hero, boxes: Box[] | Bridge[] = []): void {
    for (const box of boxes) {
      if (this.checkCollision(hero, box)) {
        hero.y = box.y;
        hero.stay();
      }
    }
  }

  public resolveEnemiesCollisions(enemies: Enemy[] = [], platforms: Platform[] = []): void {
    for (const enemy of enemies) {
      for (const platform of platforms) {
        if (this.checkCollision(enemy, platform)) {
          enemy.y = platform.y;
          enemy.stay();
        }
      }
    }
  }

  public resolveBulletsForEnemiesCollisions(bullets: Bullet[], enemies: Enemy[]): void {
    for (let i = 0; i < bullets.length; i += 1) {
      // console.log(bullets[0]);

      for (let j = 0; j < enemies.length; j += 1) {
        if (this.checkCollision(bullets[i], enemies[j]) && bullets[i].type === 'heroBullet') {
          bullets[i].removeFromParent();
          bullets.splice(i, 1);
          enemies[j].removeFromParent();
          enemies.splice(j, 1);
        }
      }
    }
  }
}
