import { format } from 'date-fns';

import { ElementId, Events, Templates } from 'src/constants';
import { dispatchEvent, getTemplate } from 'src/helpers';

export class TUIDatePicker extends HTMLElement {
  constructor() {
    super();
    const templateNode = getTemplate(Templates.datePicker);

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(templateNode);
    const picker = shadowRoot.getElementById(ElementId.datePicker)!;

    picker.addEventListener('click', this.handleClick);
    picker.addEventListener('change', this.handleChange);
  }

  handleClick(event: MouseEvent) {
    (event.target as HTMLInputElement).showPicker();
  }

  handleChange(event: Event) {
    const date = (event.target as HTMLInputElement).valueAsDate;

    if (date) {
      this.dataset.date = format(date, 'yyyy-MM-dd');
    } else {
      delete this.dataset.date;
    }

    dispatchEvent(Events.onChangeDate, date);
  }
}
