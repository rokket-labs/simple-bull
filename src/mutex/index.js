import Mutex from './Mutex'

const promises = {}

function getMutex(id) {
  let mutex = promises[id]
  if (!mutex) {
    mutex = new Mutex(id)
    promises[id] = mutex
  }

  return mutex
}

export async function lock(id) {
  const mutex = getMutex(id)
  await mutex.lock()
}

export async function unlock(id) {
  const mutex = getMutex(id)
  mutex.unlock()
}
