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

export interface ILevelData {
  data: IPlatform[];
  mountains: IMountain[];
  boxes: IPlatform[];
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
}

export interface IKeys {
  up: { pressed: boolean };
  down: { pressed: boolean };
  left: { pressed: boolean };
  right: { pressed: boolean };
  jump: { pressed: boolean };
  fire: { pressed: boolean };
}

