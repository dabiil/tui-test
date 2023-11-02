import { debounce } from 'lodash-es';

import { IAutoSuggestResponse } from './types';
import { APIurl } from './url';

const getAutoSuggestFunction = async (key: string, onChange: (items: IAutoSuggestResponse[]) => void) => {
  const response = await fetch(`${APIurl}/${key}`);

  const data = (await response.json()) as IAutoSuggestResponse[];

  onChange(data);
};

export const getAutoSuggest = debounce(getAutoSuggestFunction, 300);
