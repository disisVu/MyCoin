import React from 'react'
import { ConfirmPasswordModal, LandingModal, NewPasswordModal } from '~/components/Modal/index'
import SeedPhraseModal from '~/components/Modal/SeedPhraseModal'

export default function LandingPage() {
  const [isOpen, setIsOpen] = React.useState<boolean[]>([true, false, false, false])
  const [storedPassword, setStoredPassword] = React.useState<string>('')

  const seedPhrase: string[] = [
    'team', 'police', 'puppy', 'meantion', 'term', 'leg', 'knock',
    'meadow', 'bargain', 'coyote', 'cattle', 'mom'
  ]

  return (
    <div
      className='flex justify-center items-center'
      style={{ width: '100vw', height: '100vh', backgroundColor: '#fdfdff' }}
    >
      {isOpen[0] && <LandingModal setIsOpen={setIsOpen}/>}
      {isOpen[1] && <NewPasswordModal setIsOpen={setIsOpen} setStoredPassword={setStoredPassword}/>}
      {isOpen[2] && <ConfirmPasswordModal setIsOpen={setIsOpen} storedPassword={storedPassword}/>}
      {isOpen[3] && <SeedPhraseModal setIsOpen={setIsOpen} seedPhrase={seedPhrase}/>}
    </div>
  )
}