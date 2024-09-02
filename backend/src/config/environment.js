import 'dotenv/config'

const env = {
  MONGODB_URL: process.env.MONGODB_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT,
  P2P_PORT: process.env.P2P_PORT,
  AUTHOR: process.env.AUTHOR,
  PEERS: process.env.PEERS
}

export { env }