import React from "react";
import { motion } from "framer-motion";

export const Motion: React.FC = ({ children }) => {
  return (
    <motion.div initial="initial" animate="animate">
      {children}
    </motion.div>
  );
};
