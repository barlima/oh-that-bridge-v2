import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, AnimationControls } from "framer-motion";

export const useAnimateInView = (): {
  ref: (node?: Element) => void;
  controls: AnimationControls;
} => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
    if (!inView) {
      controls.start("initial");
    }
  }, [controls, inView]);

  return {
    ref,
    controls,
  };
};
