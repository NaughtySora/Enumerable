"use strict";

const { deepEqual, equal } = require("node:assert/strict");
const { describe, it } = require("node:test");
const Enumerable = require("../lib/index.js");

describe('Enumerable', () => {
  it('iterator', () => {
    const expected = ["test-0", "test-1"];
    const ee = new Enumerable(expected);
    deepEqual([...ee], expected);
  });

  it('from', () => {
    const ee = Enumerable.from({ length: 2 }, (_, i) => `test-${i ** 2}`);
    const test = [ee[0], ee[1]]
    deepEqual([...ee], ["test-0", "test-1"]);
  });

  it('of', () => {
    const ee = Enumerable.of("test-0", "test-1");
    deepEqual([...ee], ["test-0", "test-1"]);
  });

  it('toString', () => {
    const from = ["test-0", "test-1"];
    const ee = new Enumerable(from);
    equal(ee.toString(), from.toString());
  });

  it('length', () => {
    const expected = ["test-0", "test-1"];
    const e = Enumerable.of("test", "value");
    const ee = new Enumerable(expected);
    const eee = Enumerable.from({ length: 2 }, (_, index) => `${index}-${index}`);
    equal(expected.length, e.length);
    equal(expected.length, ee.length);
    equal(expected.length, eee.length);
  });
});
