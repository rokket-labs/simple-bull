const port = process.env.REDIS_PORT || 6970;
const host = process.env.REDIS_HOST || 'localhost';
const password = process.env.REDIS_PASSWORD || '';
const stringUrl = process.env.REDIS_STRING_URL;

export default function () {
  if (stringUrl) return stringUrl;
  return { redis: { port, host, password } };
}
