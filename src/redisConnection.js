export default function (redisConnection, redisUrl) {
  const client = redisConnection(redisUrl)
  const subscriber = redisConnection(redisUrl)

  const redisClient = {
    createClient: function (type) {
      if (type === 'client') return client
      if (type === 'subscriber') return subscriber
      if (type === 'bclient') return redisConnection(redisUrl)
      throw new Error('Unexpected connection type: ', type)
    }
  }
  return redisClient
}
