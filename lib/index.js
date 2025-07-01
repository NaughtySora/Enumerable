"use strict";

const isPrimitive = value =>
  typeof value !== "object" && typeof value !== "function";

class Enumerable {
  #length = 0;

  constructor(members) {
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const key = `${member}`;
      const length = this.#length;
      if (this[key] !== undefined) continue;
      if (!isPrimitive(member)) {
        throw new Error("Enum value has to be string");
      }
      this[length] = key;
      if (this[key] !== undefined) {
        throw new Error(`key ${key} is already exists`);
      }
      Object.defineProperty(this, key, { value: length, });
      this.#length++;
    }
    Object.freeze(this);
  }

  [Symbol.iterator]() {
    const length = this.#length;
    const self = this;
    let i = 0;
    return {
      next() {
        while (true) {
          return {
            value: self[i],
            done: i++ === length,
          };
        }
      }
    }
  }

  get length() {
    return this.#length;
  }

  toString() {
    return [...this].toString();
  }

  static from(arrayLike, fn) {
    const length = arrayLike.length;
    const array = [];
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