import { Box } from '@mui/material'
import { colors } from '~/material'

interface ButtonPrimaryProps {
  enabled: boolean,
  text: string,
  onClickCallback: () => void
}

export function ButtonPrimary({ enabled, text, onClickCallback } : ButtonPrimaryProps) {
  return (
    <Box
      className={`${enabled ? 'cursor-pointer' : ''} w-full h-10 my-1 flex justify-center items-center rounded-xl`}
      sx={{
        backgroundColor: enabled ? colors.secondary : colors.button_secondary,
        color: enabled ? '#fff' : colors.text_primary,
        ':hover': {
          filter: enabled ? 'brightness(105%)' : colors.button_secondary
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