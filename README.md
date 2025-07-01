# Description

### Simple enumerable type
### Implements Array interface (length, iterable)

- from

```js
const expected = ["test-0", "test-1"];
const type = Enumerable.from(["value", "value"], (v, i) => `${v}${i}`);
console.log(type.value0); // 0;
console.log(type[0]); // value0;
```

- of

```js
const type = Enumerable.of("Expired", "Active");
console.log(type.Expired); // 0;
console.log(type[0]); // Expired;
```

- simple

```js
const type = new Enumerable(["Expired", "Active"]);
console.log(type.Expired); // 0;
console.log(type[0]); // Expired;
```

- iterable

```js
const types = new Enumerable(["Expired", "Active"]);
for(const type of types) type // Expired, Active

const copy = [...types]; // ["Expired", "Active"]
```

- using array methods

```js
const types = new Enumerable(["Expired", "Active"]);
const array = Array.prototype.map.call(types, v => v); // ["Expired", "Active"]

const ee = new Enumerable(["test", "test2"]);
Array.prototype.forEach.call(ee, console.log); 
// test 0 Enumerable { '0': 'test', '1': 'test2' }
// test2 1 Enumerable { '0': 'test', '1': 'test2' }
```