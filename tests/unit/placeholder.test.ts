import { describe, it, expect } from 'vitest';
import mixitup from '../../src/index';

describe('mixitup', () => {
  it('should export a function', () => {
    expect(typeof mixitup).toBe('function');
  });
});
