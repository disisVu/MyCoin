/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

interface CustomError extends Error {
  statusCode?: number
}

export const errorHandlingMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || getReasonPhrase(err.statusCode),
    stack: err.stack
  }

  res.status(responseError.statusCode).json(responseError)
}