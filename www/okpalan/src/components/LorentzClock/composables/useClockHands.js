import { ref, onUnmounted } from 'vue'

export function useClockHands() {
  const animationFrame = ref(null)

  const updateHandAngles = (prefix, time) => {
    const hours = time.getHours() % 12
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    const milliseconds = time.getMilliseconds()

    const hands = {
      Hour: {
        angle: (hours + minutes/60) * 30,
        duration: 43200000 // 12 hours in milliseconds
      },
      Minute: {
        angle: (minutes + seconds/60) * 6,
        duration: 3600000 // 1 hour in milliseconds
      },
      Second: {
        angle: (seconds + milliseconds/1000) * 6,
        duration: 60000 // 1 minute in milliseconds
      }
    }

    Object.entries(hands).forEach(([hand, { angle }]) => {
      const element = document.getElementById(`${prefix}${hand}Hand`)
      if (element) {
        element.setAttribute('transform', `rotate(${angle})`)
      }
    })
  }

  const startClockAnimation = (properClock, dilatedClock, gamma = 1) => {
    const animate = () => {
      const currentTime = new Date()
      const dilatedTime = new Date(currentTime.getTime() * gamma)

      updateHandAngles('proper', currentTime)
      updateHandAngles('dilated', dilatedTime)

      animationFrame.value = requestAnimationFrame(animate)
    }

    animate()
  }

  const stopClockAnimation = () => {
    if (animationFrame.value) {
      cancelAnimationFrame(animationFrame.value)
      animationFrame.value = null
    }
  }

  // Clean up on component unmount
  onUnmounted(() => {
    stopClockAnimation()
  })

  return {
    updateHandAngles,
    startClockAnimation,
    stopClockAnimation,
    animationFrame
  }
}
