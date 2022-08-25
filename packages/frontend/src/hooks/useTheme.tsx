import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'

import { storageIds, themes, paletteKeys } from '../constants'

const getDefaultTheme = () => {
  const isDark = window.matchMedia('(prefers-color-scheme:dark)').matches
  return isDark ? themes.DARK : themes.LIGHT
}

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(storageIds.THEME, getDefaultTheme())
  const [paletteIndex, setPaletteIndex] = useLocalStorage(
    storageIds.PALETTE_INDEX,
    0
  )

  const palette = paletteKeys[paletteIndex as number]

  useEffect(() => {
    if (theme) {
      document.body.classList.value = `${theme} ${palette}`
    }
  }, [theme])

  useEffect(() => {
    if (palette) {
      document.body.classList.value = `${theme} ${palette}`
    }
  }, [palette])

  return {
    theme,
    setTheme,
    paletteIndex: paletteIndex as number,
    setPaletteIndex,
  }
}
