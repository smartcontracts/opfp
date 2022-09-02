import './MirrorCard.scss'
import Tilt from 'react-parallax-tilt'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

import { storageIds, themes } from '../../constants'
import { useTheme } from '../../hooks/useTheme'

interface MirrorCardProps {
  content: React.ReactNode
  description: React.ReactNode
  showSkeleton?: boolean
}

export const MirrorCard = ({
  content,
  description,
  showSkeleton,
}: MirrorCardProps) => {
  const { theme: _theme } = useTheme()
  const [theme] = useLocalStorage(storageIds.THEME, _theme)
  const [isFlipped, setIsFlipped] = useState(false)

  let glareMaxOpacity = theme === themes.DARK ? 0.4 : 0.4
  let glareColor = theme === themes.DARK ? '#FFFFFF' : '#FFFFFF'

  useEffect(() => {
    glareMaxOpacity = theme === themes.DARK ? 0.4 : 0.4
    glareColor = theme === themes.DARK ? '#FFFFFF' : '#FFFFFF'
  }, [_theme])

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="mirrorCard__wrapper" onClick={flipCard}>
      <Tilt
        className="mirrorCard__container"
        glareEnable={true}
        glareMaxOpacity={glareMaxOpacity}
        glareColor={glareColor}
        glarePosition="all"
        flipHorizontally={isFlipped}
      >
        {isFlipped ? (
          <div className="mirrorCard__backside">
            <p>"Magic mirror on the wall..."</p>
          </div>
        ) : (
          <>
            <div className="mirrorCard__content">{content}</div>
            {showSkeleton ? (
              <div>loading...</div>
            ) : (
              <div className="mirrorCard__description">{description}</div>
            )}
          </>
        )}
      </Tilt>
    </div>
  )
}
