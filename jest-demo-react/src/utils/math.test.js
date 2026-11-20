import {add, subtract, multiply} from './math.js';

describe('Math functions', () => {
  test('add should return the sum of two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract should return the difference of two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test('multiply should return the product of two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
