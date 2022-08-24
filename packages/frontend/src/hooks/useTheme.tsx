import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'

import { storageIds, themes } from '../constants'

const getDefaultTheme = () => {
  const isDark = window.matchMedia('(prefers-color-scheme:dark)').matches
  return isDark ? themes.DARK : themes.LIGHT
}

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(storageIds.THEME, getDefaultTheme())
  useEffect(() => {
    if (theme) {
      document.body.classList.value = theme
    }
  }, [theme])
  return [
    theme,
    (theme: string) => {
      document.body.classList.value = theme ?? getDefaultTheme()
      setTheme(theme)
    },
  ] as const
}
