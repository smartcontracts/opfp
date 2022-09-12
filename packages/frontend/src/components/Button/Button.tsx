import classnames from 'classnames'

import Spinner from '../Spinner/Spinner'
import './Button.scss'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  isLoading?: boolean
  isDisabled?: boolean
  isSecondary?: boolean
}

export const Button = ({
  children,
  onClick,
  isLoading,
  isDisabled,
  isSecondary,
}: ButtonProps) => {
  return (
    <button
      className={classnames('button__container', {
        button__containerLoading: isLoading,
        button__containerDisabled: isDisabled,
        button__containerSecondary: isSecondary,
      })}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}
