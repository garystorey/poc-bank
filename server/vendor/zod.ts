export type ZodIssue = { path: (string | number)[]; message: string };

export class ZodError extends Error {
  issues: ZodIssue[];
  constructor(issues: ZodIssue[]) {
    super('Invalid input');
    this.issues = issues;
  }
}

type ParseResult<T> = { success: true; data: T } | { success: false; error: ZodError };

type Checker<T> = (value: unknown) => ParseResult<T>;

class ZodType<T> {
  protected checker: Checker<T>;

  constructor(checker: Checker<T>) {
    this.checker = checker;
  }

  parse(value: unknown): T {
    const result = this.checker(value);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }

  optional(): ZodType<T | undefined> {
    return new ZodType<T | undefined>((value) => {
      if (value === undefined || value === null) {
        return { success: true, data: undefined };
      }
      return this.checker(value);
    });
  }

  default(defaultValue: T): ZodType<T> {
    return new ZodType<T>((value) => {
      if (value === undefined) {
        return { success: true, data: defaultValue };
      }
      return this.checker(value);
    });
  }

  transform<U>(fn: (value: T) => U): ZodType<U> {
    return new ZodType<U>((value) => {
      const parsed = this.checker(value);
      if (!parsed.success) {
        return parsed;
      }
      try {
        return { success: true, data: fn(parsed.data) };
      } catch (error) {
        return {
          success: false,
          error: error instanceof ZodError ? error : new ZodError([{ path: [], message: (error as Error).message }]),
        };
      }
    });
  }
}

class ZodNumber extends ZodType<number> {
  private checks: ((value: number) => string | null)[] = [];

  constructor(checker?: Checker<number>) {
    super(checker ?? ((value) => (typeof value === 'number' && !Number.isNaN(value) ? { success: true, data: value } : numberError([]))));
  }

  int(): ZodNumber {
    this.checks.push((value) => (Number.isInteger(value) ? null : 'Expected integer'));
    return this;
  }

  positive(): ZodNumber {
    this.checks.push((value) => (value > 0 ? null : 'Expected positive number'));
    return this;
  }

  max(limit: number): ZodNumber {
    this.checks.push((value) => (value <= limit ? null : `Must be <= ${limit}`));
    return this;
  }

  min(limit: number): ZodNumber {
    this.checks.push((value) => (value >= limit ? null : `Must be >= ${limit}`));
    return this;
  }

  override parse(value: unknown): number {
    const parsed = super.parse(value);
    const issues = this.checks
      .map((check) => check(parsed))
      .filter((msg): msg is string => Boolean(msg))
      .map((message) => ({ path: [], message }));
    if (issues.length) {
      throw new ZodError(issues);
    }
    return parsed;
  }
}

class ZodString extends ZodType<string> {
  constructor() {
    super((value) => (typeof value === 'string' ? { success: true, data: value } : stringError([])));
  }
}

function numberError(path: (string | number)[]): ParseResult<number> {
  return { success: false, error: new ZodError([{ path, message: 'Expected number' }]) };
}

function stringError(path: (string | number)[]): ParseResult<string> {
  return { success: false, error: new ZodError([{ path, message: 'Expected string' }]) };
}

function object(schema: Record<string, ZodType<any>>) {
  return new ZodType<Record<string, any>>((value) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return { success: false, error: new ZodError([{ path: [], message: 'Expected object' }]) };
    }
    const issues: ZodIssue[] = [];
    const result: Record<string, any> = {};
    for (const [key, validator] of Object.entries(schema)) {
      try {
        result[key] = validator.parse((value as Record<string, any>)[key]);
      } catch (error) {
        const err = error as ZodError;
        issues.push(...err.issues.map((issue) => ({ ...issue, path: [key, ...issue.path] })));
      }
    }
    if (issues.length) {
      return { success: false, error: new ZodError(issues) };
    }
    return { success: true, data: result };
  });
}

function number(): ZodNumber {
  return new ZodNumber();
}

function string(): ZodString {
  return new ZodString();
}

function coerceNumber(): ZodNumber {
  return new ZodNumber((value) => {
    const coerced = Number(value);
    return Number.isNaN(coerced) ? numberError([]) : { success: true, data: coerced };
  });
}

export const z = Object.assign(function zod() {}, {
  object,
  number,
  string,
  coerce: { number: coerceNumber },
});
