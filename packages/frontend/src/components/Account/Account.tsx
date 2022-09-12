import { useState } from 'react'

import { shortenAddress } from '../../helpers'
import { CopyIcon } from '../CopyIcon/CopyIcon'

import './Account.scss'

interface AccountProps {
  account: string
}
export const Account = ({ account }: AccountProps) => {
  const [showCheck, setShowCheck] = useState(false)

  return (
    <h1
      className="account__container"
      onClick={() => {
        setShowCheck(true)
        navigator.clipboard.writeText(account)
        setTimeout(() => {
          setShowCheck(false)
        }, 2000)
      }}
    >
      {shortenAddress(account)} <CopyIcon showCheck={showCheck} />
    </h1>
  )
}
