import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { blockController } from '~/controllers/blockController'
import { blockValidation } from '~/validations/blockValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Note: API get list blocks' })
  })
  .post(blockValidation.createBlock, blockController.createBlock)

export const blockRoute = Router