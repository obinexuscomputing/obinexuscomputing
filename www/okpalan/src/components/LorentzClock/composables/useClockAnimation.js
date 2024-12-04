import { ref } from 'vue'
import { calculateLorentzFactor , useClockHands } from '@/utils'

export function useClockAnimation(clockContainer, velocity, clockState, clockSvg, c) {
  const animationFrame = ref(null)

  const updateHandAngles = (prefix, time) => {
    const hours = time.getHours() % 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const milliseconds = time.getMilliseconds()

    const hourAngle = (hours + minutes/60) * 30
    const minuteAngle = (minutes + seconds/60) * 6
    const secondAngle = (seconds + milliseconds/1000) * 6

    const hands = {
      Hour: hourAngle,
      Minute: minuteAngle,
      Second: secondAngle
    }

    Object.entries(hands).forEach(([hand, angle]) => {
      const element = document.getElementById(`${prefix}${hand}Hand`)
      if (element) {
        element.setAttribute('transform', `rotate(${angle})`)
      }
    })
  }

  const updateClockHands = () => {
    const gamma = calculateLorentzFactor(velocity.value, c)
    const currentTime = new Date()
    const dilatedTime = new Date(currentTime.getTime() * gamma)

    updateHandAngles('proper', currentTime)
    updateHandAngles('dilated', dilatedTime)

    clockState.value = {
      gamma,
      properTime: currentTime,
      dilatedTime
    }

    animationFrame.value = requestAnimationFrame(updateClockHands)
  }

  const initializeClock = () => {
    if (clockContainer.value) {
      clockContainer.value.innerHTML = clockSvg
      updateClockHands()
    }
  }

  return {
    initializeClock,
    updateClockHands,
    animationFrame
  }
}