import type { KeysSwitcher } from "../shared/keysSwitcher";
import type { UIElements } from "../shared/uiElements";

export class Panel {
  private keysSwitcher: KeysSwitcher;
  private UIElements: UIElements

  constructor(keysSwitcher: KeysSwitcher,  UIElements: UIElements) {
    this.keysSwitcher = keysSwitcher;
    this.UIElements = UIElements;

    this.createPanel();
  }

  private createPanel(): void {
    const container = document.querySelector('#app');
    const panelWrapper = document.createElement('div');
    container?.appendChild(panelWrapper);
    const keys = this.keysSwitcher.keys;

    for (const key in keys) {
      const item = this.UIElements.createKeyItemView(keys[key], key);
      panelWrapper.appendChild(item);
    }
  }

}
