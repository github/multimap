# MultiMap

Store multiple values under each map key.

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
```

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
