import { Block } from '~/models/classes/Block'
import { blockRepository } from '~/repository/blockRepository'

const createNew = async (reqBody: Block) => {
  try {
    const createdBlock = await blockRepository.createBlock(reqBody)
    return createdBlock
  }
  catch (error) {
    throw new Error((error as Error).message)
  }
}

export const blockService = {
  createNew
}