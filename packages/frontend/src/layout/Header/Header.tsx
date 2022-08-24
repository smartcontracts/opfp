import { themes } from '../../constants'
import { useTheme } from '../../hooks/useTheme'
import './Header.scss'

export const Header = () => {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => {
    if (theme === themes.LIGHT) {
      setTheme(themes.DARK)
    } else {
      setTheme(themes.LIGHT)
    }
  }
  return (
    <nav className="header__container">
      <ul className="header__nav">
        <li>🌸</li>
        <li>
          <p className="titleText"> magic mirror</p>
        </li>
        <li>
          <button className="themeButton" onClick={toggleTheme}>
            {theme === themes.LIGHT ? '🌑' : '🌕'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
