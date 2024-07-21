import Joi from 'joi'
import { getDatabase } from '~/config/mongodb'

const BLOCK_COLLECTION_NAME = 'blocks'
const BLOCK_COLLECTION_SCHEMA = Joi.object({
  index: Joi.number().required(),
  previousHash: Joi.string().required(),
  timestamp: Joi.date().timestamp('unix'),
  data: Joi.string().required(),
  hash: Joi.string().required()
})

const validateBeforeCreate = async (data) => {
  return await BLOCK_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const createdBlock = await getDatabase().collection(BLOCK_COLLECTION_NAME).insertOne(validData)
    return createdBlock
  }
  catch (error) {
    throw new Error(error)
  }
}

export const blockModel = {
  BLOCK_COLLECTION_NAME,
  BLOCK_COLLECTION_SCHEMA,
  createNew
}