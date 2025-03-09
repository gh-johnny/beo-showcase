import { useEffect } from "react";

const useMount = (callback: () => void): void => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useMount };
