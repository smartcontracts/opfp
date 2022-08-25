import { paletteEmojis, palettes, paletteKeys, themes } from '../../constants'
import { useTheme } from '../../hooks/useTheme'
import './Header.scss'

export const Header = () => {
  const { theme, setTheme, paletteIndex, setPaletteIndex } = useTheme()

  const toggleTheme = () => {
    if (theme === themes.LIGHT) {
      setTheme(themes.DARK)
    } else {
      setTheme(themes.LIGHT)
    }
  }

  const togglePalette = () => {
    if (paletteIndex >= 9) {
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
          <p className="titleText">
            <span className="red">[</span>
            <span className="red">m</span>
            <span className="orange">a</span>
            <span className="yellow">g</span>
            <span className="green">i</span>
            <span className="blue">c</span> {` `}
            <span className="purple">m</span>
            <span className="red">i</span>
            <span className="orange">r</span>
            <span className="yellow">r</span>
            <span className="green">o</span>
            <span className="blue">r</span>
            <span className="purple">]</span>
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
