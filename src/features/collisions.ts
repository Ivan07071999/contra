import type { Container, Rectangle } from 'pixi.js';
import type { Platform } from '../shared/platform';
import type { Box } from '../shared/box';
import { Hero } from '../entities/hero';
import { Bridge } from '../shared/bridgeSegment';
import type { Enemy } from '../entities/enemy';
import type { Bullet } from '../shared/bullets/bullet';
import type { Tourelle } from '../entities/tourelle';
import { BossWeapons } from '../shared/bossWeapons';
import type { BossDoor } from '../shared/bossDoor';

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
      if (bullets[i].type !== 'heroBullet') continue;
      for (let j = 0; j < enemies.length; j += 1) {
        if (this.checkCollision(bullets[i], enemies[j])) {
          enemies[j].removeFromParent();
          enemies.splice(j, 1);
          bullets[i].removeFromParent();
          bullets.splice(i, 1);
          break;
        }
      }
    }
  }

  public resolveBulletsForTourelliesCollisions(bullets: Bullet[], tourellies: Tourelle[]): void {
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i].type !== 'heroBullet') continue;
      for (let j = 0; j < tourellies.length; j += 1) {
        if (this.checkCollision(bullets[i], tourellies[j])) {
          bullets[i].removeFromParent();
          bullets.splice(i, 1);
          tourellies[j].HP -= 1;

          if (tourellies[j].HP === 0) {
            tourellies[j].destroyTourelle();
            tourellies.splice(j, 1);
          }
          break;
        }
      }
    }
  }

  public resolveBulletsForBossGunCollision(bossWeapons: BossWeapons, bullets: Bullet[]): void {
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i].type !== 'heroBullet') continue;
      for (let j = 0; j < bossWeapons.bossWeapons.length; j += 1) {
        if (this.checkCollision(bullets[i], bossWeapons.bossWeapons[j])) {
          bullets[i].removeFromParent();
          bullets.splice(i, 1);
          bossWeapons.bossGunHP[j] -= 1;
          break;
        }
      }
    }
  }

  public resolveBossDoorCollision(bossDoor: BossDoor, bullets: Bullet[]): void {
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i].type !== 'heroBullet') continue;
      if (this.checkCollision(bossDoor, bullets[i])) {
        bullets[i].removeFromParent();
        bullets.splice(i, 1);
        bossDoor.HP -= 1;
        break;
      }
    }
  }

  public resolveEnemyBulletsForHeroCollisions(hero: Hero, bullets: Bullet[]): void {
    for (let i = 0; i < bullets.length; i += 1) {
      if (bullets[i].type !== 'enemyBullet') continue;
      if (this.checkCollision(hero, bullets[i])) {
        bullets[i].removeFromParent();
        bullets.splice(i, 1);
        break;
      }
    }
  }

  public resolveEnemyForHeroCollisions(hero: Hero, enemies: Enemy[]) {
    for (const enemy of enemies) {
      if (this.checkCollision(hero, enemy)) {
        console.log('Столкновение с врагом');
      }
    }
  }
}
