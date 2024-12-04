import { ref } from 'vue'
import { calculateLorentzFactor } from '@/utils'
import { useClockHands } from './useClockHands';

export function useClockAnimation(clockContainer, velocity, clockState, clockSvg, c) {
  const { startClockAnimation, stopClockAnimation, animationFrame } = useClockHands()

  const updateClockHands = () => {
    const gamma = calculateLorentzFactor(velocity.value, c)
    clockState.value = {
      gamma,
      properTime: new Date(),
      dilatedTime: new Date(Date.now() * gamma)
    }

    startClockAnimation(true, true, gamma)
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