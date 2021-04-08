import { Variants } from "framer-motion";

const easing = [0.6, -0.05, 0.01, 0.99];

export const slideLeft: Variants = {
  initial: {
    x: "25%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ease: easing,
      duration: 0.6,
    },
  },
};
