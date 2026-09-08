import { CAL_LINK } from "./site";

/**
 * Spread onto any button or link that should open the booking popup.
 * Plain data attributes, so server components can use it too.
 */
export const calTrigger = () => {
  if (!CAL_LINK) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_CALCOM_LINK is not set, so booking CTAs will not open."
      );
    }
    return {};
  }

  return {
    "data-cal-link": CAL_LINK,
    "data-cal-config": '{"layout":"month_view"}',
  };
};
