import { useEffect, useRef } from 'react';
// InProgress
function useOpacity<E extends HTMLElement = HTMLElement>(
  duration: number,
  delay: number
) {
  const ref = useRef<E>(null);
  useEffect(() => {
    if (ref.current) {
      // const { current } = ref;
      // current.style;
      // current.style.transition = `opacity ${duration}s ${delay}s`;
      // current.style.opacity = 1;
    }
  }, [duration, delay]);

  return {
    ref,
    style: { opacity: 0 },
  };
}
export default useOpacity;
