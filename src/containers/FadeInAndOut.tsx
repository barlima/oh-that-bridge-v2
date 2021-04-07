import React from "react";
import { motion } from "framer-motion";
import { fadeInAndOut } from "../utils/animations";

export const FadeInAndOut = ({ children, ...props }) => {
  return (
    <motion.div variants={fadeInAndOut} {...props}>
      {children}
    </motion.div>
  );
};
