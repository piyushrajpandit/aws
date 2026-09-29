/**
 * Adaptive Concurrency Runner for Mobile and Desktop
 *
 * Dispatches async tasks concurrently up to a safe hardware/platform limit.
 * - Mobile devices (iOS / Android): Limited to 2 concurrent tasks to preserve RAM & prevent browser tab crashes.
 * - Desktop / Laptop: Scales up to 4 concurrent tasks.
 */

export function getPlatformConcurrencyLimit(): number {
  if (typeof navigator === 'undefined') return 2;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) ||
    (typeof navigator.maxTouchPoints === 'number' &&
      navigator.maxTouchPoints > 1 &&
      typeof window !== 'undefined' &&
      window.innerWidth < 1024);

  if (isMobile) {
    return 2; // Safe memory boundary for mobile browser tabs
  }

  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  return Math.min(Math.max(2, hardwareConcurrency - 1), 4);
}

/**
 * Execute an array of items through an async mapping function with bounded concurrency.
 * Preserves the exact index order in the resolved results array.
 */
export async function runConcurrent<T, R>(
  items: T[],
  asyncFn: (item: T, index: number) => Promise<R>,
  concurrencyLimit: number = getPlatformConcurrencyLimit()
): Promise<R[]> {
  if (items.length === 0) return [];
  if (items.length === 1 || concurrencyLimit <= 1) {
    const results: R[] = [];
    for (let i = 0; i < items.length; i++) {
      results.push(await asyncFn(items[i], i));
    }
    return results;
  }

  const results: R[] = new Array(items.length);
  let currentIndex = 0;

  const worker = async () => {
    while (currentIndex < items.length) {
      const idx = currentIndex++;
      results[idx] = await asyncFn(items[idx], idx);
    }
  };

  const poolSize = Math.min(concurrencyLimit, items.length);
  const workers = Array.from({ length: poolSize }, () => worker());

  await Promise.all(workers);
  return results;
}
