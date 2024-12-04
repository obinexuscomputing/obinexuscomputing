import { svgToDataUrl, svgToBase64DataUrl } from '@/utils'

export function useClockExport(clockContainer) {
  const exportClock = (format = 'url') => {
    const svg = clockContainer.value?.innerHTML
    if (!svg) return null

    const converter = format === 'url' ? svgToDataUrl : svgToBase64DataUrl
    const dataUrl = converter(svg)

    const link = document.createElement('a')
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    link.download = `lorentz-clock-${timestamp}.svg`
    link.href = dataUrl
    link.click()
  }

  return {
    exportClock
  }
}