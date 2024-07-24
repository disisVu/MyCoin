import { getDatabase } from '~/config/mongodb'
import { Block } from '~/models/classes/Block'

const BLOCK_COLLECTION_NAME = 'blocks'

const createNew = async (block: Block) => {
  try {
    const db = getDatabase()
    const collection = db.collection(BLOCK_COLLECTION_NAME)
    const result = await collection.insertOne(block)
    return result
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const blockModel = {
  BLOCK_COLLECTION_NAME,
  createNew
}