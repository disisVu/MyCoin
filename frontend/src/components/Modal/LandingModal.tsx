/* eslint-disable no-unused-vars */
import { colors } from '~/material'
import { ButtonPrimary, ButtonTransparent } from '~/components/Button/FullWidth'

interface LandingModalProps {
  setIsOpen: (newState: boolean[]) => void
}

export default function LandingModal({ setIsOpen } : LandingModalProps) {
  function openNewPasswordModal() {
    setIsOpen([false, true, false, false])
  }

  return (
    <div
      className='rounded-xl flex flex-col justify-center'
      style={{
        width: '460px',
        height: '600px',
        padding: '56px',
        backgroundColor: '#fff',
        boxShadow: '0 0 3px rgba(0,0,0,0.16)'
      }}
    >
      <span
        className='cursor-default flex items-center justify-start text-3xl font-bold'
        style={{ color: colors.secondary, marginBottom: '20px' }}
      >
        MyCoin
      </span>
      <span
        className='cursor-default flex items-center justify-start font-bold'
        style={{ color: colors.text_primary, fontSize: '34px' }}
      >
        Multiple Chains.
      </span>
      <span
        className='cursor-default flex items-center justify-start font-bold'
        style={{ color: colors.text_primary, marginBottom: '140px', fontSize: '34px' }}
      >
        One Wallet.
      </span>
      <ButtonPrimary enabled={true} text='Create a new wallet' onClickCallback={openNewPasswordModal}/>
      <ButtonTransparent text='Restore existing wallet' onClickCallback={() => {}}/>
    </div>
  )
}