import { Variants } from "framer-motion";

export const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const mediumStagger: Variants = {
  animate: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.3,
    },
  },
};

export const slowStagger: Variants = {
  animate: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.6,
    },
  },
};
