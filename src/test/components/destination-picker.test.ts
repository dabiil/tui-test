import 'src/main';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ElementId, Events, Templates } from 'src/constants';

import { getInnerHtml, wait } from '../helpers';

const fetchMock = vi.fn();

fetchMock.mockReturnValue(
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          items: [
            {
              name: 'test Item',
            },
            {
              name: 'tre',
            },
          ],
        },
      ]),
  }),
);
global.fetch = fetchMock;

vi.mock('lodash-es', () => ({
  debounce: (fn: any) => fn,
}));

describe('destination-picker', async () => {
  const getShadowRoot = () => document.getElementsByTagName(Templates.destinationPicker)?.[0]?.shadowRoot;

  beforeEach(async () => {
    document.body.innerHTML = getInnerHtml(Templates.destinationPicker);
  });

  it('Should work onChange event and fetch ', async () => {
    const element = getShadowRoot()?.getElementById(ElementId.destinationPicker) as HTMLInputElement;

    element.value = 'tr';
    element?.dispatchEvent(new Event('input'));

    expect(fetchMock.mock.calls.length).toBe(1);

    await wait(300);

    const dialog = getShadowRoot()?.getElementById(ElementId.dialog);

    expect(dialog?.className).includes('show');
  });

  it('Should work dispatch event ', async () => {
    const element = getShadowRoot()?.getElementById(ElementId.destinationPicker) as HTMLInputElement;

    element.value = 'tr';

    const cb = vi.fn();

    expect(cb.mock.calls.length).toBe(0);

    document.addEventListener(Events.onChangeDestination, cb);

    element?.dispatchEvent(new Event('input'));

    await wait(300);

    const dialog = getShadowRoot()?.getElementById(ElementId.dialog);

    const child = dialog?.children.item(0) as HTMLDivElement;

    expect(child.dataset.value).toBe('test Item');

    child?.dispatchEvent(new Event('click'));

    expect(dialog?.className).not.includes('show');

    expect(cb.mock.calls.length).toBe(1);
  });
});
