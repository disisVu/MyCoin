import { Grid, Stack } from '@mui/material'
import colors from '~/material'

export default function Header() {
  return (
    <div className='fixed flex w-full items-center justify-center p-0 shadow-lg' style={{ height: 50, backgroundColor: colors.background }}>
      <div style={{ width: '1400px', padding: '0 20px' }}>
        <Grid container>
          <Grid item xs={2}>
            <span className='flex items-center justify-start text-xl font-bold' style={{ color: colors.primary }}>MyCoin</span>
          </Grid>
          <Grid item xs={10} className='flex items-center justify-end'>
            <Stack direction="row" spacing={3}>
              <span className='text-sm' style={{ color: colors.secondary }}>Home</span>
              <span className='text-sm' style={{ color: colors.text_primary }}>Transaction</span>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}