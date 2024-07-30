/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Block } from '~/models/classes/Block'
import ApiError from '~/utils/ApiError'

const createBlock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await Block.validateAsync(req.body)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, (error as Error).message))
  }
}

export const blockValidation = { createBlock }
