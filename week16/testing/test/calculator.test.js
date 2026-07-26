import { isEven } from "../calculator.js";
import { describe, it, test, todo } from "node:test";
import assert from "node:assert/strict";

// describe('calculator unit test', () => {
//     test('add function return of two args', () => {
//         const res = add(3, 5);
//         assert.equal(res, 8);
//     })
//     test('add thows error if args not numbers', () => {
//         assert.throws(() => add("3", "a"), Error)
//     })
//     test('function add throws error if one arg is not a number', () => {
//         assert.throws(() => add('a', 3), { message: 'a and b must be numbers' })
//     })
// })

describe("isEven", () => {
  it("is even return true", () => {
    assert.strictEqual(isEven(4), true);
  });
  it("is not even return false", () => {
    assert.strictEqual(isEven(5), false);
  });
});
