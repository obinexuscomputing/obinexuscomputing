<template>
    <div class="home">
      <header class="home-header">
        <h1>Relativistic Clock Visualization</h1>
        <p>Explore time dilation effects in special relativity through interactive visualization</p>
      </header>
  
      <main class="home-content">
        <LorentzClockView />
        
        <section class="theory-section">
          <div class="theory-card">
            <h2>Understanding Time Dilation</h2>
            <p>
              Time dilation is a consequence of Einstein's special relativity where time passes at 
              different rates for objects moving relative to each other. The effect becomes more 
              pronounced as velocity approaches the speed of light (c ≈ 3×10⁸ m/s).
            </p>
            <div class="formula">
              γ = 1/√(1 - v²/c²)
            </div>
          </div>
  
          <div class="instructions-card">
            <h2>How to Use</h2>
            <ol>
              <li>Adjust the velocity components using the input fields</li>
              <li>Observe how time dilates in the moving frame (blue clock)</li>
              <li>Compare the rates of time passage between frames</li>
              <li>Export your visualization for later reference</li>
            </ol>
          </div>
        </section>
      </main>
  
      <footer class="home-footer">
        <router-link to="/about" class="about-link">Learn More About the Project</router-link>
      </footer>
    </div>
  </template>
  
  <script>
  import LorentzClockView from '@/components/LorentzClock/LorentzClockView.vue'
  
  export default {
    name: 'HomePage',
    components: {
      LorentzClockView
    }
  }
  </script>
  
  <style scoped>
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .home-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .home-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  .home-header p {
    font-size: 1.2rem;
    color: #666;
  }
  
  .theory-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .theory-card, .instructions-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  .formula {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
    font-family: monospace;
    font-size: 1.2rem;
    margin: 1rem 0;
  }
  
  ol {
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  .about-link {
    display: inline-block;
    margin-top: 2rem;
    color: #2c3e50;
    text-decoration: none;
    border-bottom: 2px solid #2c3e50;
  }
  
  .about-link:hover {
    color: #42b983;
    border-bottom-color: #42b983;
  }
  
  .home-footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
  }
  
  @media (max-width: 768px) {
    .home {
      padding: 1rem;
    }
    
    .home-header h1 {
      font-size: 2rem;
    }
  }
  </style>