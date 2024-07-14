import React from 'react'
import { LandingModal, NewPasswordModal } from '~/components/Modal/index'

export default function LandingPage() {
  const [isOpen, setIsOpen] = React.useState<boolean[]>([true, false, false])

  return (
    <div
      className='flex justify-center items-center'
      style={{ width: '100vw', height: '100vh', backgroundColor: '#fdfdff' }}
    >
      {isOpen[0] && <LandingModal setIsOpen={setIsOpen}/>}
      {isOpen[1] && <NewPasswordModal setIsOpen={setIsOpen}/>}
    </div>
  )
}