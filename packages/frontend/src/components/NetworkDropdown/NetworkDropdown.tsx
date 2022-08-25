import './NetworkDropdown.scss'

import ClickAwayListener from 'react-click-away-listener'
import { useState } from 'react'

import { OP_NETWORK, NETWORKS } from './constants'

export const NetworkDropdown = ({}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleClickAway = () => {
    setShowDropdown(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="networkDropdown__container">
        <div
          className="networkDropdown__pill"
          onClick={() => {
            setShowDropdown(!showDropdown)
          }}
        >
          {OP_NETWORK}
        </div>

        {showDropdown && (
          <div className="networkDropdown__dropdown">
            {NETWORKS.map((network) => (
              <div className="networkDropdown__item">{network}</div>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  )
}
