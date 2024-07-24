import { blockModel } from '~/models/blockModel'
import { Block } from '~/models/classes/Block'

const createNew = async (reqBody: Block) => {
  try {
    const createdBlock = await blockModel.createNew(reqBody)
    return createdBlock
  }
  catch (error) {
    throw new Error((error as Error).message)
  }
}

export const blockService = {
  createNew
}