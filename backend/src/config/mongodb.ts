import { env } from '~/config/environment'
/* eslint-disable no-console */
import { MongoClient, Db, ServerApiVersion } from 'mongodb'

const mongoClient = new MongoClient(env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

let databaseInstance: Db | null = null

export const connectDatabase = async () => {
  await mongoClient.connect()
  databaseInstance = mongoClient.db(env.DATABASE_NAME)
}

export const getDatabase = () => {
  if (!databaseInstance) {
    throw new Error('Must connect to database first!')
  }
  return databaseInstance
}

export const closeDatabaseConnection = async () => {
  await mongoClient.close()
}