import './Button.scss'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="button__container" onClick={onClick}>
      {children}
    </button>
  )
}
