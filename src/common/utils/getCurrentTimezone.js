import { DEFAULTS } from '../defaults/defaults';

export const getCurrentTimezone = () => {
  const currentTimezone = 0 - new Date().getTimezoneOffset();
  return DEFAULTS.MODAL.CALL_TRACKING.TIME_ZONE.find((timezone) => timezone.id === currentTimezone);
};
