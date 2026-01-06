import { z as fallbackZ, ZodError as FallbackZodError } from './vendor/zod.ts';

let z = fallbackZ;
let ZodError = FallbackZodError;

try {
  // @ts-expect-error Optional dependency resolved at runtime.
  const real = await import('zod');
  z = real.z as typeof fallbackZ;
  ZodError = real.ZodError as typeof FallbackZodError;
} catch (error) {
  console.warn('Using bundled zod fallback. Install the "zod" package for full validation features.');
}

export { z, ZodError };
