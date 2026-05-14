import type { Texture } from "pixi.js";

export interface IPlatform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IMountain {
  x: number;
  count: number;
}

export interface IEnemy {
  x: number;
  y: number;
}

export interface IBooster {
  x: number;
  y: number;
}

export interface ILevelData {
  data: IPlatform[];
  mountains: IMountain[];
  boxes: IPlatform[];
  enemies: IEnemy[];
  weaponBoosters: IBooster
}

interface IRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface IFrameData {
  frame: IRect;
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: IRect;
  sourceSize: IRect;
}

type FramesDictionary = Record<string, IFrameData>

interface IMeta {
  app: string;
  version: string;
  image: string;
  format: string;
  scale: string;
  size: IRect;
}

type IAnimations = Record<string, string[] | Texture[]>;

export interface ISpriteAtlas {
  frames: FramesDictionary;
  meta: IMeta;
  animations: IAnimations;
}

export interface IBulletContext {
  x: number;
  y: number;
  angle: number;
  type: string;
}

export interface IKeys {
  up: { pressed: boolean };
  down: { pressed: boolean };
  left: { pressed: boolean };
  right: { pressed: boolean };
  jump: { pressed: boolean };
  fire: { pressed: boolean };
}

export interface ISound {
  BG: string;
  FIRE: string;
  EXPLOSION: string;
  GAME_OVER: string;
  VICTORY: string;
  STAY: string;
  KILL: string;
  BULLET_BOUNDS: string;
  WEAPON_UP: string;
}

export interface IKeysControl {
  up: string;
  down: string;
  left: string;
  right: string;
  jump: string;
  fire: string;
}
