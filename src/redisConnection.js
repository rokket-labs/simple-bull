import Redis from 'ioredis'

const port = process.env.REDIS_PORT
const host = process.env.REDIS_HOST
const password = process.env.REDIS_PASSWORD
const username = process.env.REDIS_USERNAME
const envSsl = process.env.REDIS_SSL
const stringUrl = process.env.REDIS_STRING_URL

// This will be deprecated in version 1.4.0
const getUrlFromEnv = () => {
  if (stringUrl) return stringUrl
  if (!host && !port) throw new Error(`You must configure redis connection`)
  const conn = envSsl ? `rediss` : `redis`
  return `${conn}://${username}:${password}@${host}:${port}`
}

const getUrlFromConfig = ({ username, password, host, port, url, ssl }) => {
  if (url) return url
  const conn = ssl ? 'rediss' : 'redis'
  return `${conn}://${username}:${password}@${host}:${port}`
}

export default function (redisConfig) {
  const redisUrl = !redisConfig ? getUrlFromEnv() : getUrlFromConfig(redisConfig)

  const client = new Redis(redisUrl)
  const subscriber = new Redis(redisUrl)

  const config = {
    createClient: function (type) {
      switch (type) {
        case 'client':
          return client
        case 'subscriber':
          return subscriber
        case 'bclient':
          return new Redis(redisUrl)
        default:
          throw new Error('Unexpected connection type: ', type)
      }
    }
  }
  return config
}
