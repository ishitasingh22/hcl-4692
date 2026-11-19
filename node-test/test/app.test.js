import {greet, greetHindi, processOrder} from '../app.js';
import {describe, mock, test} from 'node:test';
import assert from 'node:assert';

describe('order feature', () => {
  test('processOrder should return payment info', () => {
    const mockDependency = {
      processPayment: mock.fn((amount) => {
      console.log('Mocked processPayment called with amount:', amount);
      return {
        status: 'success',
        amount: amount,
        transactionId: 'mocked-transaction-id',
      };
      }),
    };
    const orderData = { amount: 100 };

    const paymentInfo = processOrder(orderData, mockDependency);
    assert.strictEqual(paymentInfo.status, 'success');
    assert.strictEqual(paymentInfo.amount, 100);
    assert.strictEqual(paymentInfo.transactionId, 'mocked-transaction-id');
  });
});
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

