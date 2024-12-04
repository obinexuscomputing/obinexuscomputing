<template>
  <div class="about-page">
    <BasePattern
      pattern="f"
      :content="fPatternContent"
    />
    
    <BasePattern
      pattern="t"
      :content="tPatternContent"
    />
    
    <BasePattern
      pattern="z"
      :content="zPatternContent"
    />
  </div>
</template>

<script setup lang="js">
import BasePattern from '@/components/patterns/BasePattern.vue'

const fPatternContent = {
  header: `
    <h1>Understanding Special Relativity</h1>
  `,
  main: `
    <p>Time dilation is a fascinating consequence of Einstein's special relativity theory. 
    When objects move at high velocities relative to each other, time flows at different
    rates for each observer.</p>
  `,
  sidebar: `
    <div class="info-box">
      <h3>Key Concept</h3>
      <p>The closer an object's velocity gets to the speed of light, 
      the more pronounced the time dilation effect becomes.</p>
    </div>
  `,
  secondary: `
    <p>Our interactive visualization demonstrates this effect using synchronized clocks,
    allowing you to explore how velocity affects the passage of time.</p>
  `
}

const tPatternContent = {
  header: `
    <h2>The Lorentz Factor</h2>
  `,
  main: `
    <p>The mathematical relationship between velocity and time dilation is described
    by the Lorentz factor (γ). This fundamental equation shows how time slows down
    as velocity increases.</p>
  `,
  secondary: `
    <div class="formula">
      γ = 1/√(1 - v²/c²)
    </div>
  `
}

const zPatternContent = {
  main: `
    <h2>Interactive Exploration</h2>
    <p>Our visualization tool lets you experiment with different velocities
    and observe the resulting time dilation effects in real-time.</p>
  `,
  secondary: `
    <p>Use the controls to adjust velocity components and watch as the clocks
    demonstrate the fascinating consequences of special relativity.</p>
  `
}
</script>

<style lang="scss" scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.info-box {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.formula {
  font-family: monospace;
  font-size: 1.2em;
  text-align: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .about-page {
    padding: 1rem;
  }
}
</style>
