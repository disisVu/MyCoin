/* eslint-disable no-unused-vars */
import { colors } from '~/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import React from 'react'
import { ButtonPrimary } from '../Button/FullWidth'

interface ConfirmPasswordModalProps {
  storedPassword: string,
  setIsOpen: (newState: boolean[]) => void
}

export default function ConfirmPasswordModal({ storedPassword, setIsOpen } : ConfirmPasswordModalProps) {
  function handleReturn() {
    setIsOpen([false, true, false])
  }

  function openConfirmPasswordModal() {
    setIsOpen([false, false, true])
  }

  const [password, setPassword] = React.useState<string>('')
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [isMatchedPassword, setIsMatchedPassword] = React.useState<boolean>(true)

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

  function handleTypePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
    setIsMatchedPassword(event.target.value == storedPassword || event.target.value == '')
  }

  return (
    <div
      className='rounded-xl flex flex-col items-start'
      style={{
        width: '460px',
        height: '600px',
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
      <div style={{ width: '100%', padding: '66px 56px 56px' }}>
        <p
          className='cursor-default text-left leading-10 font-bold'
          style={{ color: colors.text_primary, marginBottom: '10px', fontSize: '34px' }}
        >
          Confirm your password
        </p>
        <p
          className='cursor-default text-left leading-6 text-md'
          style={{ color: colors.text_secondary, marginBottom: '20px' }}
        >
          MyCoin is non-custodial. We cannot restore or reset your password for you. Make sure you remember it.
        </p>
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={handleTypePassword}
          />
        </FormControl>
        {!isMatchedPassword && <p
          className='cursor-default text-left leading-6 text-sm ml-2'
          style={{ color: '#f00', marginBottom: '20px' }}
        >
          Passwords dont match
        </p>}
        <div style={{ marginTop: '20px' }}>
          <ButtonPrimary
            enabled={(isMatchedPassword && password != '')}
            text='Next' onClickCallback={openConfirmPasswordModal}
          />
        </div>
      </div>
    </div>
  )
}