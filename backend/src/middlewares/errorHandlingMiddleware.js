/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || getReasonPhrase(err.statusCode),
    stack: err.stack
  }

  res.status(responseError.statusCode).json(responseError)
}