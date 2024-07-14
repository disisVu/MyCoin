import { colors } from '~/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { TransactionSchema } from '~/data/transactions'
import { Divider, Grid, List, ListItem } from '@mui/material'

interface TransactionListProps {
  title: string,
  transactions: TransactionSchema[]
}

export default function TransactionList({ title, transactions } : TransactionListProps) {
  return (
    <div className='w-full bg-white rounded-xl shadow-md border'>
      <div className='flex justify-start items-center' style={{ height: '62px', padding: '16px' }}>
        <span className='font-semibold' style={{ color: colors.text_primary, fontSize: '15px' }}>{title}</span>
      </div>
      <Divider />
      <List style={{ padding: '16px' }}>
        { transactions.map((transaction, index) => (
          <div key={index}>
            <ListItem className='w-full' sx={{ height: '48px', padding: '0px' }}>
              <Grid container spacing={2} className='flex items-center p-0'>
                <Grid item xs={4} className='flex items-center'>
                  <div
                    className='flex justify-center items-center'
                    style={{ width: '48px', height: '48px', marginRight: '8px', backgroundColor: '#F8F9FA' }}
                  >
                    <FontAwesomeIcon icon={faFileLines} size='lg' style={{ color: '#6C757D' }}/>
                  </div>
                  <div className='flex flex-col justify-between font-medium' style={{ width: '112px' }}>
                    <span className='text-sm truncate' style={{ color: colors.secondary }}>{transaction.hash}</span>
                    <span className='text-xs' style={{ color: colors.text_secondary }}>{transaction.time} sec ago</span>
                  </div>
                </Grid>
                <Grid item xs={8} className='flex justify-between items-center'>
                  <div className='flex flex-col justify-between'>
                    <div className='flex flex-row font-medium'>
                      <span className='text-sm mr-1' style={{ color: colors.text_primary }}>
                        From
                      </span>
                      <span className='text-sm truncate' style={{ color: colors.secondary }}>
                        {middleTruncate(transaction.sender, 22)}
                      </span>
                    </div>
                    <div className='flex flex-row font-medium'>
                      <span className='text-sm mr-1' style={{ color: colors.text_primary }}>
                        To
                      </span>
                      <span className='text-sm truncate' style={{ color: colors.secondary }}>
                        {middleTruncate(transaction.receiver, 22)}
                      </span>
                    </div>
                  </div>
                  <div className='rounded-md border flex justify-center items-center px-2 py-1'>
                    <span className='font-medium' style={{ color: '#000', fontSize: '0.7rem' }}>
                      {transaction.amount} Eth
                    </span>
                  </div>
                </Grid>
              </Grid>
            </ListItem>
            {index !== transactions.length - 1 && <Divider component='li' sx={{ margin: '16px 0' }} />}
          </div>
        )) }
      </List>
      <Divider />
      <div className='cursor-pointer flex justify-center items-center' style={{ height: '62px', padding: '16px' }}>
        <span className='text-xs font-semibold' style={{ color: colors.text_secondary }}>VIEW ALL TRANSACTIONS</span>
      </div>
    </div>
  )
}

function middleTruncate(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text
  }

  const ellipsis = '...'
  const leftLength = Math.ceil((maxLength - ellipsis.length) / 2)
  const rightLength = Math.floor((maxLength - ellipsis.length) / 2)

  const leftPart = text.slice(0, leftLength)
  const rightPart = text.slice(text.length - rightLength)

  return `${leftPart}${ellipsis}${rightPart}`
}