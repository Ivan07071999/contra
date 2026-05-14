import type { Container } from "pixi.js";
import type { Hero } from "../entities/hero";
import type { Bridge } from "../shared/bridgeSegment";
import type { WeaponBooster } from "../shared/weaponBooster";
import type { EndGame } from "../shared/endGame";
import type { HealthPoint } from "../shared/medal";
import type { Tourelle } from "../entities/tourelle";

export class PlaygroundUpdate {

  public limitHeroPosition(hero: Hero, view: number, boss: number): void {
    if (hero.x < -view) hero.x = -view;
    if (hero.x >= boss) hero.x = boss;
  }

  public updateWeaponBooster(
    boosters: WeaponBooster[],
    hero: Hero,
    boss: number,
    vh: number,
  ): void {
    for (let i = 0; i < boosters.length; i += 1) {
      boosters[i].update();
      if (hero.x === boosters[i].x) boosters[i].startLoop = true;
      if (boosters[i].y > vh || boosters[i].x > boss) {
        boosters[i].removeFromParent();
        boosters.splice(i, 1);
      }
    }
  }

  public blowUpBridge(
    hero: Hero,
    bridges: Bridge[],
    position: { position: number; hasExploded: boolean },
  ): void {
    if (!position.hasExploded && hero.x >= position.position) {
      bridges.forEach((segment, interval) => {
        setTimeout(() => {
          segment.blowUpSegment();
        }, interval * 500);
      });

      position.hasExploded = true;
    }
  }

  public checkHeroDead(
    hero: Hero,
    view: Container,
    endGame: EndGame,
    position: number,
    healthPoint: HealthPoint,
    resetPlayground: () => void,
  ): void {
    if (hero.isDead) {
      if (hero.HP === 0) {
        endGame.x = -position + (800 - endGame.width) / 2;
        view.addChild(endGame.gameOver());

        setTimeout(() => {
          view.removeChild(endGame.gameOver());
          resetPlayground();
          hero.respawnHero(200);
        }, 3000);

        return;
      }
      const heroPosition = -position + 200;

      setTimeout(() => {
        view.x = heroPosition;
        hero.respawnHero(heroPosition);
        healthPoint.createHealthPoint(hero.HP);
      }, 1000);
    }
  }

  public checkEndGame(view: Container, HP: number, endGame: EndGame, tourellies: Tourelle[]): void {
    if (HP === 0) {
      endGame.x = -view.x + 100;
      tourellies.forEach((tourele) => {
        tourele.HP = 0;
      });

      view.addChild(endGame.endGame());
    }
  }
}
