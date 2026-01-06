class ZodError extends Error {
  constructor(issues) {
    super('Validation failed');
    this.issues = issues;
    this.name = 'ZodError';
  }
}

class ZodType {
  constructor(validator) {
    this.validator = validator;
  }

  _parse(data) {
    const issues = [];
    const result = this.validator(data, issues);
    return { success: issues.length === 0, data: result, issues };
  }

  parse(data) {
    const parsed = this._parse(data);
    if (!parsed.success) {
      throw new ZodError(parsed.issues);
    }
    return parsed.data;
  }

  safeParse(data) {
    const parsed = this._parse(data);
    if (!parsed.success) {
      return { success: false, error: new ZodError(parsed.issues) };
    }
    return { success: true, data: parsed.data };
  }

  optional() {
    return new ZodType((value, issues) => {
      if (value === undefined || value === null) {
        return undefined;
      }
      return this.validator(value, issues);
    });
  }

  default(defaultValue) {
    return new ZodType((value, issues) => {
      if (value === undefined) {
        return defaultValue;
      }
      return this.validator(value, issues);
    });
  }

  transform(transformer) {
    return new ZodType((value, issues) => {
      const result = this.validator(value, issues);
      if (issues.length) return undefined;
      return transformer(result);
    });
  }
}

const z = {
  string: () =>
    new ZodType((value, issues) => {
      if (typeof value !== 'string') {
        issues.push({ message: 'Expected string' });
        return undefined;
      }
      return value;
    }),
  number: () =>
    new ZodType((value, issues) => {
      const num = Number(value);
      if (Number.isNaN(num)) {
        issues.push({ message: 'Expected number' });
        return undefined;
      }
      return num;
    }),
  enum: (values) =>
    new ZodType((value, issues) => {
      if (!values.includes(value)) {
        issues.push({ message: `Expected one of: ${values.join(', ')}` });
        return undefined;
      }
      return value;
    }),
  object: (shape) =>
    new ZodType((value, issues) => {
      if (typeof value !== 'object' || value === null) {
        issues.push({ message: 'Expected object' });
        return undefined;
      }
      const parsed = {};
      for (const key of Object.keys(shape)) {
        try {
          parsed[key] = shape[key].parse(value[key]);
        } catch (error) {
          issues.push({ path: key, message: error.issues?.[0]?.message || error.message });
        }
      }
      if (issues.length) return undefined;
      return parsed;
    }),
};

module.exports = { z, ZodError };
