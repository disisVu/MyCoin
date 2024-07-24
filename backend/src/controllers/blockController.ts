/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { blockService } from '~/services/blockService'

export const createBlock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const createdBlock = await blockService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdBlock)
  } catch (error) {
    next(error)
  }
}

export const blockController = { createBlock }
