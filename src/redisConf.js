const port = process.env.REDIS_PORT || 6970
const host = process.env.REDIS_HOST || 'localhost'
const password = process.env.REDIS_PASSWORD || ''

export default { port, host, password }
