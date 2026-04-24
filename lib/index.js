"use strict";

const { reflection: { isPrimitive } } = require("naughty-util");

const DONE = {
  value: undefined,
  done: true,
};

Object.freeze(DONE);

class Enumerable {
  #length = 0;

  constructor(members) {
    this.#init(members);
    Object.freeze(this);
  }

  #init(members) {
    for (let i = 0; i < members.length; i++) {
      const key = members[i];
      if (typeof key !== "string") {
        throw new Error("Enum value has to be string");
      }
      if (this[key] !== undefined) {
        throw new Error(`key ${key} is already exists`);
      }
      const length = this.#length;
      this[length] = key;
      Object.defineProperty(this, key, { value: length, });
      this.#length++;
    }
  }

  [Symbol.iterator]() {
    const length = this.#length;
    let i = 0;
    const next = () => {
      if (i === length) return DONE;
      return { value: this[i], done: i++ === length, };
    };
    return { next };
  }

  get length() {
    return this.#length;
  }

  toString() {
    return [...this].toString();
  }

  static from(arrayLike, fn) {
    const length = arrayLike.length;
    const array = new Array(length);
    for (let i = 0; i < length; i++) {
      array[i] = fn(arrayLike[i], i);
    }
    return new Enumerable(array);
  }

  static of(...members) {
    return new Enumerable(members);
  }
}


module.exports = Enumerable;