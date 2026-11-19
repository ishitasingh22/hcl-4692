import {greet, greetHindi} from '../app.js';
import {describe, test} from 'node:test';
import assert from 'node:assert';

//nameless function ()=>{}
describe('greet function', () => {
  test('greet function should return greeting message', () => {
    const expected = 'Hello, World';
    const actual = greet('World');
    assert.strictEqual(actual, expected);
  });
  test('greet function should return greeting message for another name', () => {
    const expected = 'Hello, Alice';
    const actual = greet('Alice');
    assert.strictEqual(actual, expected);
  });
});
describe('greetHindi function', () => {
  test('greetHindi function should return greeting message in Hindi', () => {
    const expected = 'नमस्ते, Alice';
    const actual = greetHindi('Alice');
    assert.strictEqual(actual, expected);
  });
});

