export class Enumerable {
  constructor(members: string[]);
  [Symbol.iterator](): IterableIterator<string>;
  length: number;
  toString(): string;
  static from<T extends { length: number }>(
    arrayLike: T,
    fn: (item: unknown, idx: unknown) => string,
  ): Enumerable;
  static of(...args: string[]): Enumerable;
}
