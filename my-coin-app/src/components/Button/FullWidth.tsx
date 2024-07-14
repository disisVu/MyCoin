import { Box } from '@mui/material'
import { colors } from '~/material'

interface ButtonPrimaryProps {
  text: string,
  onClickCallback: () => void
}

export function ButtonPrimary({ text, onClickCallback } : ButtonPrimaryProps) {
  return (
    <Box
      className='cursor-pointer w-full h-10 my-1 flex justify-center items-center rounded-xl'
      sx={{
        backgroundColor: colors.secondary,
        color: '#fff',
        ':hover': {
          filter: 'brightness(105%)'
        }
      }}
      onClick={onClickCallback}
    >
      <span className='text-sm font-semibold'>{text}</span>
    </Box>
  )
}

interface ButtonTransparentProps {
  text: string,
  onClickCallback: () => void
}

export function ButtonTransparent({ text, onClickCallback } : ButtonTransparentProps) {
  return (
    <Box
      className='cursor-pointer w-full h-10 my-1 flex justify-center items-center rounded-xl'
      sx={{
        color: colors.text_primary,
        ':hover': {
          backgroundColor: '#eee'
        }
      }}
      onClick={onClickCallback}
    >
      <span className='text-sm font-semibold'>{text}</span>
    </Box>
  )
}