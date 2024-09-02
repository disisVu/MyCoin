import { blockRepository } from '~/repository/blockRepository'

const createNew = async (reqBody) => {
  try {
    const createdBlock = await blockRepository.createBlock(reqBody)
    return createdBlock
  }
  catch (error) {
    throw new Error((error).message)
  }
}

export const blockService = {
  createNew
}