/* eslint-disable no-console */
import express from 'express'
import { closeDatabaseConnection, connectDatabase, getDatabase } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from '~/config/environment'
import { myCoinAPI } from '~/routes/index'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const startServer = async () => {
  const app = express()

  app.use(express.json())

  app.use('/api', myCoinAPI)

  app.use(errorHandlingMiddleware)

  app.get('/', async (req, res) => {
    console.log(await getDatabase().listCollections().toArray())
    res.end('<h1>Hello World!</h1>')
  })

  app.listen(env.PORT, env.HOSTNAME, () => {
    console.log(`3. Server is running at http://${env.HOSTNAME}:${env.PORT}`)
  })

  exitHook(() => {
    console.log('4. Server is shutting down...')
    closeDatabaseConnection()
    console.log('5. Disconnected from MongoDB Atlas.')
  })
}

(async () => {
  try {
    console.log('1. Connecting to database...')
    await connectDatabase()
    console.log('2. Connected to database.')
    startServer()
  }
  catch (error) {
    console.log(error)
    process.exit(0)
  }
})()