import { Variants } from "framer-motion";

export const fadeInAndOutSlowly: Variants = {
  initial: {
    opacity: 0,
    transform: 'scale(1.2)'
  },
  animate: {
    opacity: 1,
    transform: 'scale(1)',
    transition: {
      duration: 0.3
    }
  },
};
