import 'src/main';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ElementId, Events, Templates } from 'src/constants';

import { getInnerHtml } from '../helpers';

describe('date-picker', () => {
  const getShadowRoot = () => document.getElementsByTagName(Templates.datePicker)?.[0]?.shadowRoot;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(async () => {
    document.body.innerHTML = getInnerHtml(Templates.datePicker);
  });

  it('Should work onChange event', () => {
    const element = getShadowRoot()?.getElementById(ElementId.datePicker) as HTMLInputElement;

    expect(element.dataset.date).toBe(undefined);

    element.valueAsDate = new Date(1998, 8, 14, 12, 12, 12);
    element?.dispatchEvent(new Event('change'));

    expect(element.dataset.date).toBe('1998-09-14');
  });

  it('Should work dispatch event', () => {
    const element = getShadowRoot()?.getElementById(ElementId.datePicker) as HTMLInputElement;

    const cb = vi.fn();

    expect(cb.mock.calls.length).toBe(0);

    document.addEventListener(Events.onChangeDate, cb);

    element?.dispatchEvent(new Event('change'));

    expect(cb.mock.calls.length).toBe(1);
  });
});
