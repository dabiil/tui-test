import 'src/main';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ElementId, Events, Templates } from 'src/constants';
import { dispatchEvent } from 'src/helpers';

import { getInnerHtml } from '../helpers';

describe('selection-summary', () => {
  const getShadowRoot = () => document.getElementsByTagName(Templates.selectionSummary)?.[0]?.shadowRoot;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(async () => {
    document.body.innerHTML = getInnerHtml(Templates.selectionSummary);
  });

  it('Should render destination default text', () => {
    const element = getShadowRoot()?.getElementById(ElementId.destination);

    expect(element?.innerHTML).toBe('Please select Destination');
  });

  it('Should destination event listener works', () => {
    const element = getShadowRoot()?.getElementById(ElementId.destination);

    const newValue = 'Lviv';

    expect(element?.innerHTML).toBe('Please select Destination');

    dispatchEvent(Events.onChangeDestination, newValue);
    expect(element?.innerHTML).toBe(`Selected destination: ${newValue}`);
  });

  it('Should render date default text', () => {
    const element = getShadowRoot()?.getElementById(ElementId.date);

    expect(element?.innerHTML).toBe('Please select date');
  });

  it('Should destination event listener works', () => {
    const element = getShadowRoot()?.getElementById(ElementId.date);

    const newValue = new Date(1998, 8, 14, 12, 12, 12);

    expect(element?.innerHTML).toBe('Please select date');
    dispatchEvent(Events.onChangeDate, newValue);
    expect(element?.innerHTML).toBe(`Selected date: 14.09.1998`);
  });
});
