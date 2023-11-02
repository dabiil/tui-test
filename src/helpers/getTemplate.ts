import type { Templates } from 'src/constants';

export const getTemplate = (id: Templates) => {
  const template = document.getElementById(id) as HTMLTemplateElement;

  if (!template) {
    throw Error('Template not found');
  }

  return template.content.cloneNode(true);
};
