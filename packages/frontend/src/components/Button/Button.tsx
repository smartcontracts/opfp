import classnames from 'classnames'

import Spinner from '../Spinner/Spinner'
import './Button.scss'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  isLoading?: boolean
}

export const Button = ({ children, onClick, isLoading }: ButtonProps) => {
  return (
    <button
      className={classnames('button__container', {
        button__containerLoading: isLoading,
      })}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}
