import 'dotenv/config'

interface Env {
  MONGODB_URL: string
  DATABASE_NAME: string
  HOSTNAME: string
  PORT: string
  AUTHOR: string
}

const env: Env = {
  MONGODB_URL: process.env.MONGODB_URL as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  HOSTNAME: process.env.HOSTNAME as string,
  PORT: process.env.PORT as string,
  AUTHOR: process.env.AUTHOR as string
}

export { env }