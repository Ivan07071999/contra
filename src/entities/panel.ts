import type { KeysSwitcher } from "../shared/keysSwitcher";
import type { SoundManager } from "../shared/soundManager";
import type { UIElements } from "../shared/uiElements";

export class Panel {
  private keysSwitcher: KeysSwitcher;
  private UIElements: UIElements;
  private soundManager: SoundManager;

  constructor(keysSwitcher: KeysSwitcher, UIElements: UIElements, soundManager: SoundManager) {
    this.keysSwitcher = keysSwitcher;
    this.UIElements = UIElements;
    this.soundManager = soundManager;

    this.createPanel();
  }

  private createPanel(): void {
    const container = document.querySelector('#app');
    const panelWrapper = document.createElement('div');
    panelWrapper.className = 'panelWrapper';
    container?.appendChild(panelWrapper);
    const audio = this.createAudioContainer();
    panelWrapper.appendChild(audio);

    const keys = this.keysSwitcher.keys;

    for (const key in keys) {
      if (!keys[key]) continue;
      const item = this.UIElements.createKeyItemView(keys[key], key);
      panelWrapper.appendChild(item);
    }
  }

  private createAudioContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'audioWrapper';
    const button = this.UIElements.createAudioElement();
    const input = this.UIElements.createRangeInput();
    input.addEventListener('change', () => {
      this.soundManager.setVolume(Number(input.value));
      if (input.value === '0') {
        this.soundManager.volumeState = 'mute';
      } else {
        this.soundManager.volumeState = 'play';
      }
      this.UIElements.setImg(button, this.soundManager.volumeState);
      input.blur();
    });

    button.addEventListener('click', () => {

      if (this.soundManager.volumeState === 'play') {
        this.soundManager.toggleVolume('mute');
        input.value = String(0)
        input.style.setProperty('--thumb-pos', input.value + '%');
      } else {
        this.soundManager.toggleVolume('play');
        input.value = String(this.soundManager.volume * 100);
        input.style.setProperty('--thumb-pos', String(this.soundManager.volume) + '%');
      }
      this.UIElements.setImg(button, this.soundManager.volumeState);
      button.blur();

    })
    container.append(button, input);

    return container;
  }
}
