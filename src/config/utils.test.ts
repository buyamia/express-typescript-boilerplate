import { describe, expect, it } from '@jest/globals';
import { normalizePort } from './utils';

describe('normalizePort', () => {
  it('returns the argument string if the port is not a number', () => {
    expect(normalizePort(":3000")).toBe(":3000")
  });

  it('returns a number if the port is a positive number string', () => {
    expect(normalizePort("3000")).toBe(3000)
  });

  it('returns false if the port is a negative number string', () => {
    expect(normalizePort("-3000")).toBe(false)
  });
});
