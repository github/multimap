import MultiMap from '../dist/index.js'

describe('multimap', function () {
  it('size measures keys not values', function () {
    const map = new MultiMap()
    assert.equal(0, map.size)

    map.set('k1', 1)
    assert.equal(1, map.size)

    map.set('k1', 2)
    assert.equal(1, map.size)

    map.set('k2', 1)
    assert.equal(2, map.size)

    map.delete('k2')
    assert.equal(1, map.size)

    map.clear()
    assert.equal(0, map.size)
  })

  it('sets multiple values', function () {
    const map = new MultiMap()
    map.set('k', 1)
    assert.deepEqual([1], [...map.get('k')])
    map.set('k', 2)
    assert.deepEqual([1, 2], [...map.get('k')])
  })

  it('sets only unique values', function () {
    const map = new MultiMap()
    map.set('k', 1)
    assert.deepEqual([1], [...map.get('k')])
    map.set('k', 1)
    assert.deepEqual([1], [...map.get('k')])
  })

  it('set can be chained', function () {
    const map = new MultiMap()
    map.set('k1', 1).set('k1', 2).set('k2', 3)
    assert.deepEqual([1, 2], [...map.get('k1')])
    assert.deepEqual([3], [...map.get('k2')])
  })

  it('gets empty set for missing key', function () {
    const map = new MultiMap()
    assert.deepEqual([], [...map.get('k')])
  })

  it('gets value set in insertion order', function () {
    const map = new MultiMap()
    map.set('k', 1)
    map.set('k', 2)
    assert.deepEqual([1, 2], [...map.get('k')])
  })

  it('deletes missing key', function () {
    const map = new MultiMap()
    assert.isFalse(map.delete('k'))
  })

  it('deletes missing value for key', function () {
    const map = new MultiMap()
    map.set('k', 1)
    assert.isFalse(map.delete('k', 2))
    assert.equal(1, map.size)
    assert.deepEqual([1], [...map.get('k')])
  })

  it('deletes all values for key', function () {
    const map = new MultiMap()
    map.set('k', 1)
    map.set('k', 2)
    assert.isTrue(map.delete('k'))
    assert.equal(0, map.size)
  })

  it('deletes one value for key', function () {
    const map = new MultiMap()
    map.set('k', 1)
    map.set('k', 2)
    assert.isTrue(map.delete('k', 1))
    assert.equal(1, map.size)
    assert.deepEqual([2], [...map.get('k')])
  })

  it('delete last value for key deletes the key', function () {
    const map = new MultiMap()
    map.set('k', 1)
    assert.isTrue(map.delete('k', 1))
    assert.equal(0, map.size)
    assert.isFalse(map.has('k'))
  })

  it('drains a value from all keys', function () {
    const map = new MultiMap()
    map.set('k1', 1).set('k1', 2)
    map.set('k2', 2).set('k2', 3)
    map.set('k3', 2)
    map.set('k4', 2)
    assert.deepEqual(['k3', 'k4'], map.drain(2))
    assert.deepEqual([1], [...map.get('k1')])
    assert.deepEqual([3], [...map.get('k2')])
    assert.isTrue(map.has('k1'))
    assert.isTrue(map.has('k2'))
    assert.isFalse(map.has('k3'))
    assert.isFalse(map.has('k4'))
  })

  it('contains a key', function () {
    const map = new MultiMap()
    assert.isFalse(map.has('k'))
    map.set('k', 1)
    assert.isTrue(map.has('k'))
  })

  it('iterates over keys', function () {
    const map = new MultiMap()
    map.set('k1', 1)
    map.set('k2', 2)
    assert.deepEqual(['k1', 'k2'], [...map.keys()])
  })

  it('iterates over values', function () {
    const map = new MultiMap()
    map.set('k1', 1).set('k1', 2)
    map.set('k2', 3).set('k2', 4)
    assert.deepEqual(
      [
        [1, 2],
        [3, 4]
      ],
      [...map.values()].map(set => [...set])
    )
  })

  it('iterates over entries', function () {
    const map = new MultiMap()
    map.set('k1', 1).set('k1', 2)
    map.set('k2', 3).set('k2', 4)
    assert.deepEqual(
      [
        ['k1', 1, 2],
        ['k2', 3, 4]
      ],
      [...map.entries()].map(([key, set]) => [key, ...set])
    )
  })

  it('conforms to iterable protocol with entries iterator', function () {
    const map = new MultiMap()
    map.set('k1', 1).set('k1', 2)
    map.set('k2', 3).set('k2', 4)
    assert.deepEqual(
      [
        ['k1', 1, 2],
        ['k2', 3, 4]
      ],
      [...map].map(([key, set]) => [key, ...set])
    )
  })
})
