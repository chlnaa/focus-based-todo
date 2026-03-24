import { useEffect, useRef } from 'react';

type InfiniteScrollParams = {
  hasNextPage?: boolean;
  fetchNextPage: () => void;
};

export function useInfiniteScroll({
  hasNextPage,
  fetchNextPage,
}: InfiniteScrollParams) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];

      if (first.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return ref;
}
