import { getAutoSuggest } from 'src/api';
import { ElementId, Events, Templates } from 'src/constants';
import { dispatchEvent, getTemplate } from 'src/helpers';

export class TUIDestinationPicker extends HTMLElement {
  constructor() {
    super();
    const templateNode = getTemplate(Templates.destinationPicker);

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(templateNode);
    const picker = shadowRoot.getElementById(ElementId.destinationPicker)!;

    this.handleChange = this.handleChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    picker.addEventListener('mouseenter', this.handleFocus);
    picker.addEventListener('input', this.handleChange);
  }

  handleFocus(event: MouseEvent) {
    (event.target as HTMLInputElement).focus();
  }

  async handleChange(event: Event) {
    const { value } = event.target as HTMLInputElement;

    this.handleRequestData(value);
  }

  handleItemClick(event: Event) {
    const dialog = this.shadowRoot?.getElementById(ElementId.dialog);
    const input = this.shadowRoot?.getElementById(ElementId.destinationPicker) as HTMLInputElement;

    dialog?.classList.remove('show');
    const selectedValue = (event.currentTarget as HTMLElement).dataset.value ?? '';

    input.value = selectedValue;

    dispatchEvent(Events.onChangeDestination, selectedValue);
  }

  async handleRequestData(value: string) {
    const dialog = this.shadowRoot?.getElementById(ElementId.dialog);

    dialog?.classList.remove('show');

    if (!value || !dialog) {
      getAutoSuggest.cancel();

      return;
    }

    getAutoSuggest(value, (response) => {
      if (!response || response[0]?.items.length === 0) {
        return;
      }
      dialog.innerHTML = '';

      const group = response[0];

      const newNodes: HTMLElement[] = [];

      group.items.forEach((item) => {
        const div = document.createElement('div');

        div.classList.add('item');
        div.innerHTML = item.name.replaceAll(new RegExp(value, 'ig'), `<b>$&</b>`);
        div.dataset.value = item.name;
        div.addEventListener('click', this.handleItemClick);

        dialog.appendChild(div);
      });

      newNodes.forEach((node) => dialog.appendChild(node));
      dialog.classList.add('show');
    });
  }
}
