"use strict";

const { deepStrictEqual, ok } = require("node:assert");
const Enumerable = require("../lib/index.js");

const from = () => {
  const expected = ["test-0", "test-1"];
  const ee = Enumerable.from({ length: 2 }, (_, i) => `test-${i ** 2}`);
  const test = [ee[0], ee[1]]
  deepStrictEqual(expected, test);
};

const of = () => {
  const expected = ["test-0", "test-1"];
  const ee = Enumerable.of("test-0", "test-1");
  const test = [ee[0], ee[1]]
  deepStrictEqual(expected, test);
};

const toString = () => {
  const expected = ["test-0", "test-1"];
  const ee = new Enumerable(expected);
  ok(expected.toString() === ee.toString());
};

const Iterator = () => {
  const expected = ["test-0", "test-1"];
  const ee = new Enumerable(expected);
  const iter = expected[Symbol.iterator]();
  for (const item of ee) {
    deepStrictEqual(iter.next().value, item);
  }
};

const length = () => {
  const expected = ["test-0", "test-1"];
  const e = Enumerable.of("test", "value");
  const ee = new Enumerable(expected);
  const eee = Enumerable.from({ length: 2 }, (_, index) => `${index}-${index}`);
  ok(expected.length === e.length);
  ok(expected.length === ee.length);
  ok(expected.length === eee.length);
};

const fields = () => {
  const proto = ["test2", 21, 42, 42, 42, 33, "true", true, true, false, "false", 0, 1,];
  const ee = new Enumerable(proto);
  deepStrictEqual(ee[0], "test2");
  deepStrictEqual(ee[1], "21");
  deepStrictEqual(ee[2], "42");
  deepStrictEqual(ee[3], "33");
  deepStrictEqual(ee[4], "true");
  deepStrictEqual(ee[5], "false");

  deepStrictEqual(ee.test2, 0);
  deepStrictEqual(ee["21"], 1);
  deepStrictEqual(ee["42"], 2);
  deepStrictEqual(ee["33"], 3);
  deepStrictEqual(ee.true, 4);
  deepStrictEqual(ee.false, 5);
}

for (const test of [from, of, toString, 
  Iterator, length, fields]) test();
