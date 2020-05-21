export default class MultiMap<K, V> {
  private map: Map<K, Set<V>> = new Map()

  get(key: K): Set<V> {
    const values = this.map.get(key)
    return values ? values : new Set()
  }

  set(key: K, value: V): MultiMap<K, V> {
    let values = this.map.get(key)
    if (!values) {
      values = new Set()
      this.map.set(key, values)
    }
    values.add(value)
    return this
  }

  has(key: K): boolean {
    return this.map.has(key)
  }

  delete(key: K, value?: V): boolean {
    const values = this.map.get(key)
    if (!values) return false
    if (!value) return this.map.delete(key)

    const deleted = values.delete(value)
    if (!values.size) this.map.delete(key)
    return deleted
  }

  drain(value: V): K[] {
    const empty = []
    for (const key of this.keys()) {
      if (this.delete(key, value) && !this.has(key)) {
        empty.push(key)
      }
    }
    return empty
  }

  keys(): Iterable<K> {
    return this.map.keys()
  }

  values(): Iterable<Set<V>> {
    return this.map.values()
  }

  entries(): Iterable<[K, Set<V>]> {
    return this.map.entries()
  }

  [Symbol.iterator](): Iterable<[K, Set<V>]> {
    return this.entries()
  }

  clear(): void {
    this.map.clear()
  }

  get size(): number {
    return this.map.size
  }
}
