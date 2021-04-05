import { useEffect } from "react";

export const useOnScreenResize = (callback: () => void): void => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.addEventListener("resize", callback);

    return () => {
      if (typeof window === "undefined") {
        return;
      }

      window.removeEventListener("resize", callback);
    };
  }, []);

  useEffect(() => {
    callback();
  }, []);
};
