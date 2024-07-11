import { Grid } from '@mui/material'
import { BlockList, TransactionList } from '~/components/List/index'
import { blockData } from '~/data/blocks'
import { transactionData } from '~/data/transactions'
import colors from '~/material'

export default function HomePage() {
  return (
    <div className='flex flex-col justify-start items-center' style={{ width: '100vw', minHeight: '100vh' }}>
      <div style={{ width: '100%', height: '120px', backgroundColor: colors.primary }}></div>
      <Grid container spacing={2} className='absolute' sx={{ width: '1400px', marginTop: '70px' }}>
        <Grid item xs={6}>
          <BlockList title='Latest Blocks' blocks={blockData} />
        </Grid>
        <Grid item xs={6}>
          <TransactionList title='Latest Transactions' transactions={transactionData}/>
        </Grid>
      </Grid>
    </div>
  )
}
