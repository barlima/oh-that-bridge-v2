import React from "react";
import NextNprogress from "nextjs-progressbar";

export const ProgressBar: React.FC = () => (
  <NextNprogress
    color="#b2b2b2"
    startPosition={0.3}
    stopDelayMs={200}
    height={3}
  />
);
