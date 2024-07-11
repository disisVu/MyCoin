export interface BlockSchema {
  index: number,
  time: number,
  miner: string,
  transactionCount: number,
  reward: number
}

export const blockData: BlockSchema[] = [
  { index: 1778881, time: 6, miner: 'beaverbuild', transactionCount: 190, reward: 0.0397 },
  { index: 1778882, time: 12, miner: 'beaverbuild', transactionCount: 180, reward: 0.0497 },
  { index: 1778883, time: 24, miner: 'Titan Build', transactionCount: 195, reward: 0.0597 },
  { index: 1778884, time: 36, miner: 'Titan Build', transactionCount: 197, reward: 0.0797 },
  { index: 1778885, time: 18, miner: 'beaverbuild', transactionCount: 184, reward: 0.0797 }
]