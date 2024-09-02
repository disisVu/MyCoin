/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes'
import { Block } from '~/models/classes/Block'
import ApiError from '~/utils/ApiError'

const createBlock = async (req, res, next) => {
  try {
    await Block.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, (error).message))
  }
}

export const blockValidation = { createBlock }
