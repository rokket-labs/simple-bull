export default function redisUrl ({ username, password, host, port, url, ssl }) {
  if (url) return url
  const conn = ssl ? 'rediss' : 'redis'
  if (username || password) return `${conn}://${username}:${password}@${host}:${port}`
  return `${conn}://${host}:${port}`
}
