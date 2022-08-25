import './MirrorCard.scss'
import Tilt from 'react-parallax-tilt'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'

import { storageIds, themes } from '../../constants'
import { useTheme } from '../../hooks/useTheme'

interface MirrorCardProps {
  content: React.ReactNode
  description: React.ReactNode
}

export const MirrorCard = ({ content, description }: MirrorCardProps) => {
  const { theme: _theme } = useTheme()
  const [theme] = useLocalStorage(storageIds.THEME, _theme)
  // const [isFlipped, setIsFlipped] = useState(false)

  let glareMaxOpacity = theme === themes.DARK ? 0.4 : 0.4
  let glareColor = theme === themes.DARK ? '#FFFFFF' : '#FFFFFF'

  useEffect(() => {
    glareMaxOpacity = theme === themes.DARK ? 0.4 : 0.4
    glareColor = theme === themes.DARK ? '#FFFFFF' : '#FFFFFF'
    console.log(glareMaxOpacity, glareColor)
  }, [_theme])

  // const flipCard = () => {
  //   setIsFlipped(!isFlipped)
  //   setTimeout(() => {
  //     setIsFlipped(isFlipped)
  //   }, 150)
  // }

  return (
    <div>
      <Tilt
        className="mirrorCard__container"
        glareEnable={true}
        glareMaxOpacity={glareMaxOpacity}
        glareColor={glareColor}
        glarePosition="all"
        // flipHorizontally={isFlipped}
      >
        <div className="mirrorCard__content">{content}</div>
        <div className="mirrorCard__description">{description}</div>
      </Tilt>
    </div>
  )
}
