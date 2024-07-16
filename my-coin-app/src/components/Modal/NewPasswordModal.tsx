/* eslint-disable no-unused-vars */
import { colors } from '~/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import React from 'react'
import PasswordComplexityBar from '~/components/Validation/PasswordComplexityBar'
import { ButtonPrimary } from '../Button/FullWidth'

interface NewPasswordModalProps {
  setIsOpen: (newState: boolean[]) => void,
  setStoredPassword: (newState: string) => void
}

export default function NewPasswordModal({ setIsOpen, setStoredPassword } : NewPasswordModalProps) {
  function handleReturn() {
    setIsOpen([true, false, false, false])
  }

  function openConfirmPasswordModal() {
    setIsOpen([false, false, true, false])
    setStoredPassword(password)
  }

  const [password, setPassword] = React.useState<string>('')
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [passwordComplexity, setPasswordComplexity] = React.useState<number>(0)

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

  function handleTypePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const complexity = computePasswordComplexity(event.target.value)
    setPasswordComplexity(complexity)
    setPassword(event.target.value)
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
      <div style={{ width: '100%', padding: '76px 56px 56px' }}>
        <p
          className='cursor-default text-left leading-8 font-bold'
          style={{ color: colors.text_primary, marginBottom: '8px', fontSize: '34px' }}
        >
          Pick a password
        </p>
        <p
          className='cursor-default text-left leading-6 text-md'
          style={{ color: colors.text_secondary, marginBottom: '20px' }}
        >
          This will be used to unlock your wallet.
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
        <div className='px-2 py-4'>
          <PasswordComplexityBar complexity={passwordComplexity}/>
        </div>
        <ButtonPrimary enabled={(passwordComplexity > 2)} text='Next' onClickCallback={openConfirmPasswordModal}/>
        <p
          className='cursor-default text-left text-sm'
          style={{ color: colors.text_secondary, margin: '15px 0 20px' }}
        >
          Best passwords are long and contain letters, numbers and special characters.
        </p>
      </div>
    </div>
  )
}

function computePasswordComplexity(password: string): number {
  // Initialize complexity score
  let complexity = 0
  // Check password length
  if (password.length >= 8) {
    complexity++
  }
  if (password.length >= 12) {
    complexity++
  }
  // Check for uppercase letters
  if (/[A-Z]/.test(password)) {
    complexity++
  }
  // Check for lowercase letters
  if (/[a-z]/.test(password)) {
    complexity++
  }
  // Check for digits
  if (/\d/.test(password)) {
    complexity++
  }
  // Check for special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    complexity++
  }
  return complexity
}