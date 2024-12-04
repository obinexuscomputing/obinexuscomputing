<!-- src/components/LorentzClockView.vue -->
<template>
    <div class="clock-container">
      <div ref="clockContainer" class="clock-display"></div>
      
      <div class="controls">
        <div class="velocity-inputs">
          <label v-for="axis in ['x', 'y', 'z']" :key="axis">
            {{ axis }} velocity (m/s):
            <input 
              type="number" 
              :value="velocity[axis]" 
              @input="updateVelocity(axis, $event.target.value)"
            />
          </label>
        </div>
        
        <div class="export-buttons">
          <button @click="exportClock('url')">Export as URL</button>
          <button @click="exportClock('base64')">Export as Base64</button>
        </div>
        
        <div class="stats">
          <p>Lorentz Factor (γ): {{ clockState.gamma.toFixed(6) }}</p>
          <p>Time Dilation: {{ ((clockState.gamma - 1) * 100).toFixed(2) }}%</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LorentzClock from './LorentzClock';
  
  export default {
    name: 'LorentzClockView',
    extends: LorentzClock
  };
  </script>
  
  <style scoped>
  .clock-container {
    padding: 20px;
  }
  
  .controls {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .velocity-inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .export-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
  
  .stats {
    text-align: center;
    font-family: monospace;
  }
  
  button {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #fff;
    cursor: pointer;
  }
  
  button:hover {
    background: #f0f0f0;
  }
  
  input {
    width: 150px;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>