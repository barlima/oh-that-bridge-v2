import { SizeEnum } from "../utils/types";

export const BREAKPOINT_SIZE = {
  [SizeEnum.S]: 425,
  [SizeEnum.M]: 768,
  [SizeEnum.L]: 1024,
  [SizeEnum.XL]: 1240,
};

export const breakpoints = {
  [SizeEnum.S]: `(min-width: ${BREAKPOINT_SIZE[SizeEnum.S]}px)`,
  [SizeEnum.M]: `(min-width: ${BREAKPOINT_SIZE[SizeEnum.M]}px)`,
  [SizeEnum.L]: `(min-width: ${BREAKPOINT_SIZE[SizeEnum.L]}px)`,
  [SizeEnum.XL]: `(min-width: ${BREAKPOINT_SIZE[SizeEnum.XL]}px)`,
};
