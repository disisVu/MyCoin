import { colors } from '~/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { BlockSchema } from '~/data/blocks'
import { Divider, Grid, List, ListItem } from '@mui/material'

interface BlockListProps {
  title: string,
  blocks: BlockSchema[]
}

export default function BlockList({ title, blocks } : BlockListProps) {
  return (
    <div className='w-full bg-white rounded-xl shadow-md border'>
      <div className='flex justify-start items-center' style={{ height: '62px', padding: '16px' }}>
        <span className='font-semibold' style={{ color: colors.text_primary, fontSize: '15px' }}>{title}</span>
      </div>
      <Divider />
      <List style={{ padding: '16px' }}>
        { blocks.map((block, index) => (
          <div key={index}>
            <ListItem className='w-full' sx={{ height: '48px', padding: '0px' }}>
              <Grid container spacing={2} className='flex items-center'>
                <Grid item xs={4} className='flex items-center'>
                  <div
                    className='flex justify-center items-center'
                    style={{ width: '48px', height: '48px', marginRight: '8px', backgroundColor: '#F8F9FA' }}
                  >
                    <FontAwesomeIcon icon={faCube} size='lg' style={{ color: '#6C757D' }}/>
                  </div>
                  <div className='flex flex-col justify-between font-medium'>
                    <span className='text-sm' style={{ color: colors.secondary }}>{block.index}</span>
                    <span className='text-xs' style={{ color: colors.text_secondary }}>{block.time} sec ago</span>
                  </div>
                </Grid>
                <Grid item xs={8} className='flex justify-between items-center'>
                  <div className='flex flex-col justify-between'>
                    <div className='flex flex-row font-medium'>
                      <span className='text-sm mr-1' style={{ color: colors.text_primary }}>Fee Recipient</span>
                      <span className='text-sm' style={{ color: colors.secondary }}>{block.miner}</span>
                    </div>
                    <span className='text-xs' style={{ color: colors.text_secondary }}>
                      <span className='text-sm mr-1' style={{ color: colors.secondary }}>
                        {block.transactionCount} txns
                      </span>
                      <span className='text-xs' style={{ color: colors.text_secondary }}>in 12 sec</span>
                    </span>
                  </div>
                  <div className='rounded-md border flex justify-center items-center px-2 py-1'>
                    <span className='font-medium' style={{ color: '#000', fontSize: '0.7rem' }}>
                      {block.reward} Eth
                    </span>
                  </div>
                </Grid>
              </Grid>
            </ListItem>
            {index !== blocks.length - 1 && <Divider component='li' sx={{ margin: '16px 0' }} />}
          </div>
        )) }
      </List>
      <Divider />
      <div className='cursor-pointer flex justify-center items-center' style={{ height: '62px', padding: '16px' }}>
        <span className='text-xs font-semibold' style={{ color: colors.text_secondary }}>VIEW ALL BLOCKS</span>
      </div>
    </div>
  )
}