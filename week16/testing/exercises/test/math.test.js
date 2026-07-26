import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isEven, max, average, toTitleCase, filterEven } from '../math.js';

describe('isEven', () => {
  it('should return true for an even number', () => {
    assert.strictEqual(isEven(4), true);
  });
  it('should return false for an odd number', () => {
    assert.strictEqual(isEven(3), false);
  });
  it('should throw error when input is not a number', () => {
    assert.throws(() => isEven("5"), {message: "Input must be a number"});
  });
});

describe('max', () => {
  it('should return the maximum of two positive numbers', () => {
    assert.strictEqual(max(5, 10), 10);
  });
  it('should return the maximum of two negative numbers', () => {
    assert.strictEqual(max(-5, -10), -5);
  });
  it('should return the maximum of two equal numbers', () => {
    assert.strictEqual(max(5, 5), 5);
  });   
});

describe('average', () => {
  it('should return the average of an array of numbers', () => {
    assert.strictEqual(average([1, 2, 3]), 2);
  });
  it('should return the average of an array with one number', () => {
    assert.strictEqual(average([5]), 5);
  });
  it('should throw error when the array is empty', () => {
    assert.throws(() => average([]), {message: "The array must not be empty"});
  });
});

describe('toTitleCase', () => {
  it('should convert a string to title case', () => {
    assert.strictEqual(toTitleCase("hello world"), "Hello World");
  });
  it('should convert an empty string to title case', () => {
    assert.strictEqual(toTitleCase(""), "");
  });
  it('should convert a single word to title case', () => {
    assert.strictEqual(toTitleCase("hello"), "Hello");
  });
});

describe('filterEven', () => {
  it('should return an array of even numbers from an array', () => {
    assert.deepStrictEqual(filterEven([1, 2, 3, 4, 5, 6]), [2, 4, 6]);
  });
  it('should return an empty array when there are no even numbers', () => {
    assert.deepStrictEqual(filterEven([1, 3, 5]), []);
  });
  it('should return an empty array when the array is empty', () => {
    assert.deepStrictEqual(filterEven([]), []);
  });
});

