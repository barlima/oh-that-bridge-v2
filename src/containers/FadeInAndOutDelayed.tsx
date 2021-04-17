import React from "react";
import { motion } from "framer-motion";
import { fadeInAndOutDelayed } from "../utils/animations";

export const FadeInAndOutDelayed = ({ children, ...props }) => {
  return (
    <motion.div variants={fadeInAndOutDelayed} {...props}>
      {children}
    </motion.div>
  );
};
