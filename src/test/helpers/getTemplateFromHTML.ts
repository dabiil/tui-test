import { Templates } from 'src/constants';

import file from '../../../index.html?raw';

const regx: Record<Templates, RegExp> = {
  'tui-date-picker': /<template id="tui-date-picker">[\s\S]+<\/template>/,
  'tui-destination-picker': /<template id="tui-destination-picker">[\s\S]+<\/template>/,
  'tui-selection-summary': /<template id="tui-selection-summary">[\s\S]+<\/template>/,
};

export const getTemplateFromHTML = (template: Templates) => {
  const result = regx[template].exec(file);

  return result?.[0] ?? '';
};
