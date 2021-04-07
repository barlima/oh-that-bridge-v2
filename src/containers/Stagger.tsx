import React from "react";
import { motion } from "framer-motion";
import { stagger } from "../utils/animations";

export const Stagger: React.FC = ({ children, ...props }) => {
  return (
    <motion.div variants={stagger} {...props}>
      {children}
    </motion.div>
  );
};
