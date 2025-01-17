"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

interface UseInViewStateOptions {
  triggerOnce?: boolean;
  threshold?: number;
}

const useInViewState = ({
  triggerOnce = true,
  threshold = 0.1,
}: UseInViewStateOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

  return { ref, isInView };
};

export default useInViewState;
