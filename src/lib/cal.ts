import { CAL_LINK } from "./site";

/**
 * Spread onto any button or link that should open the booking popup.
 * Plain data attributes, so server components can use it too.
 */
export const calTrigger = () => ({
  "data-cal-link": CAL_LINK,
  "data-cal-config": '{"layout":"month_view"}',
});
