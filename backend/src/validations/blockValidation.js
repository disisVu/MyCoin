/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { blockModel } from '~/models/blockModel'
import ApiError from '~/utils/ApiError'

const createBlock = async (req, res, next) => {
  try {
    await blockModel.BLOCK_COLLECTION_SCHEMA.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const blockValidation = { createBlock }