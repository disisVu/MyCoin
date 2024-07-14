import React from 'react'
import { ConfirmPasswordModal, LandingModal, NewPasswordModal } from '~/components/Modal/index'

export default function LandingPage() {
  const [isOpen, setIsOpen] = React.useState<boolean[]>([true, false, false])
  const [storedPassword, setStoredPassword] = React.useState<string>('')

  return (
    <div
      className='flex justify-center items-center'
      style={{ width: '100vw', height: '100vh', backgroundColor: '#fdfdff' }}
    >
      {isOpen[0] && <LandingModal setIsOpen={setIsOpen}/>}
      {isOpen[1] && <NewPasswordModal setIsOpen={setIsOpen} setStoredPassword={setStoredPassword}/>}
      {isOpen[2] && <ConfirmPasswordModal setIsOpen={setIsOpen} storedPassword={storedPassword}/>}
    </div>
  )
}