import { format } from 'date-fns';

import { ElementId, Events, Templates } from 'src/constants';
import { getEventDetails, getTemplate } from 'src/helpers';

export class TUISelectionSummary extends HTMLElement {
  constructor() {
    super();
    const templateNode = getTemplate(Templates.selectionSummary);

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(templateNode);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeDestination = this.handleChangeDestination.bind(this);
  }

  connectedCallback() {
    document.addEventListener(Events.onChangeDate, this.handleChangeDate);
    document.addEventListener(Events.onChangeDestination, this.handleChangeDestination);
  }

  disconnectedCallback() {
    document.removeEventListener(Events.onChangeDestination, this.handleChangeDestination);
    document.addEventListener(Events.onChangeDate, this.handleChangeDate);
  }

  handleChangeDate(event: Event) {
    const value = getEventDetails<Date | null>(event);

    const dateElement = this.shadowRoot?.getElementById(ElementId.date);

    if (!dateElement) {
      return;
    }

    dateElement.innerHTML = value === null ? 'Please select Date' : `Selected date: ${format(value, 'dd.MM.yyyy')}`;
  }

  handleChangeDestination(event: Event) {
    const value = getEventDetails<string | null>(event);

    const dateElement = this.shadowRoot?.getElementById(ElementId.destination);

    if (!dateElement) {
      return;
    }

    dateElement.innerHTML = value === null ? 'Please select Destination' : `Selected destination: ${value}`;
  }
}
