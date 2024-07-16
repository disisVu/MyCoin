/* eslint-disable no-unused-vars */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Grid } from '@mui/material'
import { ButtonPrimary } from '~/components/Button/FullWidth'
import { colors } from '~/material'

interface SeedPhraseModalProps {
  setIsOpen: (newState: boolean[]) => void,
  seedPhrase: string[]
}

export default function SeedPhraseModal({ setIsOpen, seedPhrase } : SeedPhraseModalProps) {
  function handleReturn() {
    setIsOpen([false, false, true, false])
  }

  return (
    <div
      className='rounded-xl flex flex-col items-start'
      style={{
        width: '460px',
        backgroundColor: '#fff',
        boxShadow: '0 0 3px rgba(0,0,0,0.16)'
      }}
    >
      <Box
        className='m-2 rounded-lg cursor-pointer flex justify-center items-center'
        sx={{ width: '40px', height: '40px', ':hover': { backgroundColor: colors.button_secondary } }}
        onClick={handleReturn}
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: '18px' }}/>
      </Box>
      <div style={{ width: '100%', padding: '28px 56px' }}>
        <p
          className='cursor-default text-left leading-8 font-bold'
          style={{ color: colors.text_primary, marginBottom: '16px', fontSize: '34px' }}
        >
          Secret recovery phrase
        </p>
        <p
          className='cursor-default text-left leading-5 text-md'
          style={{ color: '#ff6d00', marginBottom: '4px' }}
        >
          This is the recovery phase for your wallet. You and you alone have access to it.
          It can be used to restore your wallet.
        </p>
        <p
          className='cursor-default text-left leading-5 text-md'
          style={{ color: '#ff6d00', marginBottom: '16px' }}
        >
          Best practices for your recovery phrase are to write it down on paper and store it somewhere secure.
          Resist temptation to email it to yourself or screenshot it.
        </p>
        <div
          className='border rounded-lg'
          style={{ backgroundColor: '#F9FAFB', marginBottom: '20px', padding: '8px 16px' }}
        >
          <Grid container>
            {seedPhrase.map((word, index) => (
              <Grid item xs={6} key={index} className='flex items-center rounded-md'>
                <span
                  className='text-xs font-medium'
                  style={{ margin: '3px 16px 0 0', width:'10px', color: colors.text_secondary }}
                >
                  {index}
                </span>
                <span className='text-lg font-medium' style={{ color: colors.text_primary }}>{word}</span>
              </Grid>
            ))}
          </Grid>
        </div>
        <ButtonPrimary enabled={true} text='Next' onClickCallback={() => {}}/>
      </div>
    </div>
  )
}