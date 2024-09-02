// src/repositories/blockRepository.ts
import { getDatabase } from '~/config/mongodb'

const BLOCK_COLLECTION_NAME = 'blocks'

const createBlock = async (block) => {
  try {
    const db = getDatabase()
    const collection = db.collection(BLOCK_COLLECTION_NAME)
    const result = await collection.insertOne(block)
    return result
  } catch (error) {
    throw new Error((error).message)
  }
}

export const blockRepository = {
  createBlock
}
