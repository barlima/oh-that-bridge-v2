import { Variants } from "framer-motion";

export const fadeInAndOutDelayed: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.6,
    },
  },
};
