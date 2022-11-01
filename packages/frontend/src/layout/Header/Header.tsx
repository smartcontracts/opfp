import { useNavigate } from 'react-router-dom'

import { paletteEmojis, palettes, paletteKeys, themes } from '../../constants'
import { useTheme } from '../../hooks/useTheme'

import './Header.scss'

export const Header = () => {
  const navigate = useNavigate()
  const { theme, setTheme, paletteIndex, setPaletteIndex } = useTheme()

  const toggleTheme = () => {
    if (theme === themes.LIGHT) {
      setTheme(themes.DARK)
    } else {
      setTheme(themes.LIGHT)
    }
  }

  const togglePalette = () => {
    if (paletteIndex >= 8) {
      setPaletteIndex(0)
    } else {
      setPaletteIndex((paletteIndex as number) + 1)
    }
  }

  return (
    <nav className="header__container">
      <ul className="header__nav">
        <li>
          <button className="themeButton" onClick={togglePalette}>
            {paletteEmojis[palettes[paletteKeys[paletteIndex]]]}
          </button>
        </li>
        <li>
          <p
            className="titleText"
            onClick={() => {
              navigate('/')
            }}
          >
            MagicMirror
          </p>
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
