import { Events } from 'src/constants';

export const dispatchEvent = <T>(event: Events, value: T) => {
  document.dispatchEvent(
    new CustomEvent(event, {
      detail: {
        value,
      },
    }),
  );
};

export const getEventDetails = <T>(event: Event) =>
  (
    event as CustomEvent<{
      value: T;
    }>
  ).detail.value;
