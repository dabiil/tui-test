import { Templates } from 'src/constants';

import { getTemplateFromHTML } from './getTemplateFromHTML';

export const getInnerHtml = (template: Templates) => `
  ${getTemplateFromHTML(template)}
  <${template}></${template}>`;
