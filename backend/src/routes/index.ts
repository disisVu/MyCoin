import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blockRoute } from './blockRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'My-Coin API is ready to use.' })
})

Router.use('/blocks', blockRoute)

export const myCoinAPI = Router