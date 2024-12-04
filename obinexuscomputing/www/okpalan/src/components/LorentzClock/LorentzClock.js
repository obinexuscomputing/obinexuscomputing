import { ref, onMounted, onUnmounted } from 'vue'
import clockSvg from './clock.svg?raw'
import { SPEED_OF_LIGHT } from './constants'
import { useClockAnimation } from './composables/useClockAnimation'
import { useClockExport } from './composables/useClockExport'

export default {
  name: 'LorentzClock',
  
  setup() {
    const clockContainer = ref(null)
    const velocity = ref({ x: 50000, y: 369000, z: 481000 })
    
    const clockState = ref({
      gamma: 1,
      properTime: new Date(),
      dilatedTime: new Date()
    })

    // Use composables for animation and export logic
    const { initializeClock, updateClockHands, animationFrame } = useClockAnimation(
      clockContainer,
      velocity,
      clockState,
      clockSvg,
      SPEED_OF_LIGHT
    )

    const { exportClock } = useClockExport(clockContainer)

    // Update velocity and recalculate
    const updateVelocity = (axis, value) => {
      velocity.value[axis] = Number(value)
    }

    // Lifecycle hooks
    onMounted(() => {
      initializeClock()
    })

    onUnmounted(() => {
      if (animationFrame.value) {
        cancelAnimationFrame(animationFrame.value)
      }
    })

    return {
      clockContainer,
      velocity,
      clockState,
      updateVelocity,
      exportClock
    }
  }
}