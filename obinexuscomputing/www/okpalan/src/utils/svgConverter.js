/**
 * Convert SVG content to a data URL
 * @param {string} svgContent - SVG markup
 * @returns {string} Data URL
 */
export function svgToDataUrl(svgContent) {
    let processedContent = svgContent.replace(/xmlns=".*?"/g, '')
    
    if (!processedContent.includes('xmlns=')) {
      processedContent = processedContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
    }
  
    const encoded = processedContent
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .replace(/"/g, "'")
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
  
    return `data:image/svg+xml,${encoded}`
  }
  
  /**
   * Convert SVG content to a base64 encoded data URL
   * @param {string} svgContent - SVG markup
   * @returns {string} Base64 encoded data URL
   */
  export function svgToBase64DataUrl(svgContent) {
    let processedContent = svgContent.replace(/xmlns=".*?"/g, '')
    
    if (!processedContent.includes('xmlns=')) {
      processedContent = processedContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
    }
  
    const base64 = btoa(processedContent)
    return `data:image/svg+xml;base64,${base64}`
  }
  
  /**
   * Update clock hands angles
   * @param {string} prefix - Clock prefix identifier
   * @param {Date} time - Current time
   */
  export function updateClockHands(prefix, time) {
    const hours = time.getHours() % 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const milliseconds = time.getMilliseconds()
  
    const hands = {
      Hour: (hours + minutes/60) * 30,
      Minute: (minutes + seconds/60) * 6,
      Second: (seconds + milliseconds/1000) * 6
    }
  
    Object.entries(hands).forEach(([hand, angle]) => {
      const element = document.getElementById(`${prefix}${hand}Hand`)
      if (element) {
        element.setAttribute('transform', `rotate(${angle})`)
      }
    })
  }