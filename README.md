# MultiMap

The [multimap][1] data structure is a map in which more than one value may be stored under each key.

[1]: https://en.wikipedia.org/wiki/Multimap

## Installation

```
$ npm install @github/multimap
```

## Usage

```js
import MultiMap from '@github/multimap'
```

```ts
const map = new MultiMap<string, number>()
map.set('a', 1)
map.set('a', 2)
map.get('a') // => Set([1, 2])
map.has('a') // => true
map.size // => 1
```

### Methods

- `get(key)` - Retrieve the Set of values stored under a key or the empty Set if the key does not exist.
- `set(key, value)` - Add a value to the key's set without removing previous values.
- `has(key)` - Returns true if a value is stored under the key.
- `delete(key)` - Remove key and all of key's values.
- `delete(key, value)` - Remove a value from the key's set.
- `drain(value)` - Remove a value from all keys that reference it.
- `clear()` - Remove all keys and values to empty the map.
- `keys()` - An iterator of map keys.
- `values()` - An iterator of Sets of values for all keys.
- `entries()` - An iterator of [key, Set<value>] pairs.

### Properties

- `size` - The number of keys in the map.

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
