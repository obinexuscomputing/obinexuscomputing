<template>
    <div class="about">
      <header class="about-header">
        <h1>About the Project</h1>
        <router-link to="/" class="back-link">← Back to Visualization</router-link>
      </header>
  
      <main class="about-content">
        <section class="about-section">
          <h2>Project Overview</h2>
          <p>
            This relativistic clock visualization was created to help understand and
            demonstrate the effects of special relativity on time. Using interactive
            controls, users can explore how motion affects the passage of time in
            different reference frames.
          </p>
        </section>
  
        <section class="about-section">
          <h2>Technical Details</h2>
          <div class="tech-stack">
            <div class="tech-item">
              <h3>Frontend Framework</h3>
              <p>Built with Vue 3 and Vite for optimal performance</p>
            </div>
            <div class="tech-item">
              <h3>Graphics</h3>
              <p>SVG-based visualization with dynamic updates</p>
            </div>
            <div class="tech-item">
              <h3>Physics Engine</h3>
              <p>Custom-built relativistic calculations following special relativity</p>
            </div>
          </div>
        </section>
  
        <section class="about-section">
          <h2>How It Works</h2>
          <div class="explanation">
            <h3>The Lorentz Factor</h3>
            <p>
              The visualization uses the Lorentz factor (γ) to calculate time dilation:
              γ = 1/√(1 - v²/c²), where v is the relative velocity and c is the speed
              of light. This factor determines how much time dilates for an object
              moving at velocity v.
            </p>
  
            <h3>Clock Synchronization</h3>
            <p>
              The two clocks show time in different reference frames:
            </p>
            <ul>
              <li>The stationary frame (left clock) shows proper time</li>
              <li>The moving frame (right clock) shows dilated time</li>
            </ul>
          </div>
        </section>
  
        <section class="about-section">
          <h2>Resources</h2>
          <ul class="resources-list">
            <li>
              <a href="https://en.wikipedia.org/wiki/Time_dilation" target="_blank">
                Time Dilation on Wikipedia
              </a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Special_relativity" target="_blank">
                Special Relativity on Wikipedia
              </a>
            </li>
            <li>
              <a href="https://github.com/yourusername/relativistic-clock" target="_blank">
                Project Repository
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage'
  }
  </script>
  
  <style scoped>
  .about {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .about-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .about-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  .back-link {
    color: #42b983;
    text-decoration: none;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .about-section {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }
  
  .about-section h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }
  
  .tech-stack {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .tech-item {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 4px;
  }
  
  .tech-item h3 {
    color: #42b983;
    margin-bottom: 0.5rem;
  }
  
  .explanation h3 {
    color: #2c3e50;
    margin: 1.5rem 0 0.5rem;
  }
  
  .explanation ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1rem 0;
  }
  
  .resources-list {
    list-style: none;
    padding: 0;
  }
  
  .resources-list li {
    margin-bottom: 0.5rem;
  }
  
  .resources-list a {
    color: #42b983;
    text-decoration: none;
    display: inline-block;
    padding: 0.5rem 0;
  }
  
  .resources-list a:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    .about {
      padding: 1rem;
    }
    
    .about-header h1 {
      font-size: 2rem;
    }
    
    .tech-stack {
      grid-template-columns: 1fr;
    }
  }
  </style>