"use client"

import { useEffect, useState } from "react"
import { useInView as InviewObserver } from "react-intersection-observer"

interface UseInViewStateOptions {
  triggerOnce?: boolean
  threshold?: number
}

const useInView = ({
  triggerOnce = true,
  threshold = 0.1,
}: UseInViewStateOptions = {}) => {
  const [isInView, setIsInView] = useState(false)
  const { ref, inView } = InviewObserver({
    triggerOnce,
    threshold,
  })

  useEffect(() => {
    if (inView) {
      setIsInView(true)
    }
  }, [inView])

  return { ref, isInView }
}

export default useInView
