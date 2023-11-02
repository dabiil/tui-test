import { TUIDatePicker, TUIDestinationPicker, TUISelectionSummary } from 'src/components';
import { Templates } from 'src/constants';

import './style.css';

customElements.define(Templates.datePicker, TUIDatePicker);
customElements.define(Templates.destinationPicker, TUIDestinationPicker);
customElements.define(Templates.selectionSummary, TUISelectionSummary);
