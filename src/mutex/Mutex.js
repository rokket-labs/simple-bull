export default class Mutex {
  constructor() {
    this._waitingPromises = []
    this._waitingResolvers = []
    this.lock = this.lock.bind(this)
    this.unlock = this.unlock.bind(this)
  }

  lock() {
    const res = Promise.all(this._waitingPromises)
    this._waitingPromises.push(new Promise(resolve => this._waitingResolvers.push(resolve)))

    return res
  }

  unlock() {
    const resolve = this._waitingResolvers.shift()
    resolve()
    this._waitingPromises.shift()
  }
}
