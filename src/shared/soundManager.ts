import { sound } from "@pixi/sound";
import type { ISound } from "./types";

export class SoundManager {
  private static instance: SoundManager | undefined;
  private isMusicPlaying = false;
  public soundKeys: Readonly<ISound>;
  public volumeState: 'mute' | 'play' = 'play';
  public volume = 0.5;

  constructor() {
    this.soundKeys = {
      BG: 'bg',
      FIRE: 'fire',
      EXPLOSION: 'explosion',
      GAME_OVER: 'gameOver',
      VICTORY: 'victory',
      STAY: 'stay',
      KILL: 'kill',
      BULLET_BOUNDS: 'bulletBounds',
      WEAPON_UP: 'weaponUp',
    };
    this.toggleVolume('mute');
    this.init();
  }

  public init(): void {
    sound.add(this.soundKeys.BG, {
      url: '/Rick_Astley_-_Never_Gonna_Give_You_Up_8-Bit_Cover_(SkySound.cc).mp3',
      loop: true,
      volume: 0.1,
    });

    sound.add(this.soundKeys.FIRE, { url: '/contra-sfx-10.mp3', volume: 0.2 });
    sound.add(this.soundKeys.GAME_OVER, { url: '/game-over.mp3', volume: 0.2 });
    sound.add(this.soundKeys.KILL, { url: '/contra-sfx-18.mp3', volume: 0.2 });
    sound.add(this.soundKeys.VICTORY, { url: '/victory.mp3', volume: 0.1 });
    sound.add(this.soundKeys.STAY, { url: '/contra-sfx-19.mp3', volume: 0.2 });
    sound.add(this.soundKeys.EXPLOSION, { url: '/contra-sfx-9.mp3', volume: 0.2 });
    sound.add(this.soundKeys.BULLET_BOUNDS, { url: '/contra-sfx-15.mp3', volume: 0.2 });
    sound.add(this.soundKeys.WEAPON_UP, { url: '/contra-sfx-27.mp3', volume: 0.3 });
  }

  public static getInstance(): SoundManager {
    SoundManager.instance ??= new SoundManager();
    return SoundManager.instance;
  }

  public playSound(key: string): void {

    void sound.play(key);
  }

  public playBgMusic(): void {
    if (this.isMusicPlaying) return;

    void sound.play(this.soundKeys.BG);
    this.isMusicPlaying = true;
  }

  public stopBgMusic(): void {
    sound.stop(this.soundKeys.BG);
    this.isMusicPlaying = false;
  }

  public toggleVolume(state: string): void {
    if (state === 'play') {
      sound.volumeAll = this.volume;
      this.volumeState = 'play'
    } else {
      sound.volumeAll = 0;
      //this.volume = 0;
      this.volumeState = 'mute';
    }
  }

  public setVolume(value: number): void {
    this.volume = value * 0.01;
    sound.volumeAll = this.volume;
  }
}
