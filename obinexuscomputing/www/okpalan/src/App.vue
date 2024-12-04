<template>
    <div class="app">
      <header class="header">
        <h1>Relativistic Clock Visualization</h1>
        <p class="subtitle">Demonstrating Time Dilation using Special Relativity</p>
      </header>
  
      <main class="main-content">
        <div class="clock-section">
          <LorentzClockView class="clock-component" />
        </div>
  
        <div class="info-section">
          <div class="info-card">
            <h2>About Time Dilation</h2>
            <p>
              Time dilation is a relativistic phenomenon where time passes at different rates
              for objects moving relative to each other. The effect becomes more pronounced
              as velocity approaches the speed of light (c = 299,792,458 m/s).
            </p>
          </div>
  
          <div class="info-card">
            <h2>How to Use</h2>
            <ul>
              <li>Adjust the velocity components (x, y, z) using the input fields</li>
              <li>Observe how time dilates in the moving frame (blue clock)</li>
              <li>Export the visualization using the provided buttons</li>
            </ul>
          </div>
        </div>
      </main>
  
      <footer class="footer">
        <p>
          Built with Vue.js and SVG | 
          <a href="#" @click.prevent="openDocs('LORENTZ_CLOCK.md')">Documentation</a>
        </p>
      </footer>
    </div>
  </template>
  
  <script lang="js">
  import LorentzClockView from './components/LorentzClock/LorentzClockView.vue';
  
  export default {
    name: 'App',
    components: {
      LorentzClockView
    },
    methods: {
      openDocs(filename) {
        // You can implement documentation viewing logic here
        console.log(`Opening ${filename}`);
      }
    }
  };
  </script>
  
  <style>
  /* Reset and base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
      'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
    background-image: url('@/assets/png/pattern.png');
    background-repeat: repeat;
    background-size: 200px;
  }
  
  /* App container */
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  /* Header styles */
  .header {
    background-color: #fff;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.1rem;
  }
  
  /* Main content area */
  .main-content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  
  /* Clock section */
  .clock-section {
    background: #fff;
    border-radius: 8px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .clock-component {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  /* Info section */
  .info-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .info-card {
    background: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .info-card h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  .info-card ul {
    list-style-position: inside;
    padding-left: 1rem;
  }
  
  .info-card li {
    margin-bottom: 0.5rem;
  }
  
  /* Footer styles */
  .footer {
    background-color: #2c3e50;
    color: #fff;
    text-align: center;
    padding: 1rem;
    margin-top: auto;
  }
  
  .footer a {
    color: #fff;
    text-decoration: none;
    border-bottom: 1px dotted #fff;
  }
  
  .footer a:hover {
    border-bottom-style: solid;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .header h1 {
      font-size: 2rem;
    }
  
    .main-content {
      padding: 1rem;
    }
  
    .info-section {
      grid-template-columns: 1fr;
    }
  }
  </style>