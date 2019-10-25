import signale from 'signale'

let now = new Date()

const getUTCDate = () => {
  const month = now.getUTCMonth() + 1 // months from 1-12
  const day = now.getUTCDate()
  const year = now.getUTCFullYear()
  return `${year}-${month}-${day}`
}

const getUTCTime = () => {
  const minutes = now.getMinutes()
  const hours = now.getHours()
  const seconds = now.getSeconds()
  return `${hours}:${minutes}:${seconds}`
}

const successMessage = (job, message) => {
  const msg = signale.scope(getUTCDate(), getUTCTime(), job.name)
  msg.success({
    message,
    suffix: `[${job.name}]`
  })
}

const pendingMessage = (job, message) => {
  const msg = signale.scope(getUTCDate(), getUTCTime(), job.name)
  msg.pending({
    message
  })
}
const errorMessage = (job, message) => {
  const msg = signale.scope(getUTCDate(), getUTCTime(), job.name)
  msg.fatal(message)
}

export { successMessage, pendingMessage, errorMessage }
