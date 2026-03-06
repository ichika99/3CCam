export function useTheme() {
  const isDark = useState<boolean>('theme-dark', () => false)

  function toggle() {
    isDark.value = !isDark.value
    applyTheme()
  }

  function applyTheme() {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem('3ccam-theme', isDark.value ? 'dark' : 'light')
    }
  }

  function init() {
    if (import.meta.client) {
      const saved = localStorage.getItem('3ccam-theme')
      if (saved === 'dark') {
        isDark.value = true
      }
      applyTheme()
    }
  }

  return { isDark, toggle, init }
}
