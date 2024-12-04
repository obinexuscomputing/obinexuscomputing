<template>
    <div class="not-found">
      <header class="header">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </header>
  
      <div class="content">
        <router-link to="/" class="home-link">
          Return to Clock Visualization
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 2rem;
  }
  
  .header {
    margin-bottom: 2rem;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
  }
  
  .home-link {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .home-link:hover {
    background-color: #3aa876;
  }
  </style>