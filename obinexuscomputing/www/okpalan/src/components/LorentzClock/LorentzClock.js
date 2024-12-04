// src/components/LorentzClock/index.js
import { ref, onMounted, onUnmounted } from 'vue';
import clockSvg from './clock.svg?raw';  // Using Vite's raw loader
import { svgToDataUrl, svgToBase64DataUrl,calculateLorentzFactor } from '@/utils/index';

export default {
  name: 'LorentzClock',
  
  setup() {
    const clockContainer = ref(null);
    const velocity = ref({ x: 50000, y: 369000, z: 481000 });
    const c = 299792458; // Speed of light in m/s
    let animationFrame = null;

    const clockState = ref({
      gamma: 1,
      properTime: new Date(),
      dilatedTime: new Date()
    });

    // Initialize SVG clock
    const initializeClock = () => {
      if (clockContainer.value) {
        clockContainer.value.innerHTML = clockSvg;
        updateClockHands();
      }
    };

    // Update clock hands based on current time
    const updateClockHands = () => {
      const gamma = calculateLorentzFactor(velocity.value, c);
      const currentTime = new Date();
      const dilatedTime = new Date(currentTime.getTime() * gamma);

      updateHandAngles('proper', currentTime);
      updateHandAngles('dilated', dilatedTime);

      clockState.value = {
        gamma,
        properTime: currentTime,
        dilatedTime
      };

      animationFrame = requestAnimationFrame(updateClockHands);
    };

    // Calculate and update hand angles
    const updateHandAngles = (prefix, time) => {
      const hours = time.getHours() % 12;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const milliseconds = time.getMilliseconds();

      const hourAngle = (hours + minutes/60) * 30;
      const minuteAngle = (minutes + seconds/60) * 6;
      const secondAngle = (seconds + milliseconds/1000) * 6;

      const hands = {
        Hour: hourAngle,
        Minute: minuteAngle,
        Second: secondAngle
      };

      Object.entries(hands).forEach(([hand, angle]) => {
        const element = document.getElementById(`${prefix}${hand}Hand`);
        if (element) {
          element.setAttribute('transform', `rotate(${angle})`);
        }
      });
    };

    // Update velocity and recalculate
    const updateVelocity = (axis, value) => {
      velocity.value[axis] = Number(value);
    };

    // Export clock as SVG
    const exportClock = (format = 'url') => {
      const svg = clockContainer.value?.innerHTML;
      if (!svg) return null;

      const converter = format === 'url' ? svgToDataUrl : svgToBase64DataUrl;
      const dataUrl = converter(svg);

      // Create download link
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.download = `lorentz-clock-${timestamp}.svg`;
      link.href = dataUrl;
      link.click();
    };

    // Lifecycle hooks
    onMounted(() => {
      initializeClock();
    });

    onUnmounted(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    });

    return {
      clockContainer,
      velocity,
      clockState,
      updateVelocity,
      exportClock
    };
  }
};