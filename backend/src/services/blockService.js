import { blockModel } from '~/models/blockModel'

const createNew = async (reqBody) => {
  try {
    const newBlock = {
      ...reqBody
    }
    const createdBlock = await blockModel.createNew(newBlock)
    return createdBlock
  }
  catch (error) {
    throw new Error(error)
  }
}

export const blockService = {
  createNew
}