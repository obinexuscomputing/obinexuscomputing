<template>
    <footer class="page-footer">
      <div class="footer-content safe-area">
        <div class="footer-grid">
          <!-- Project Info -->
          <div class="footer-section">
            <div class="project-info">
              <h3 class="brand">Lorentz Clock</h3>
              <p class="tagline">
                Understanding Special Relativity
              </p>
              <p class="description">
                An interactive visualization tool for exploring time dilation effects
                in Einstein's special relativity theory.
              </p>
              <div class="social-links">
                <a
                  href="https://github.com/yourusername/lorentz-clock"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github class="icon" />
                </a>
              </div>
            </div>
          </div>
  
          <!-- Quick Links -->
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/about">About</router-link></li>
              <li><router-link to="/docs">Documentation</router-link></li>
            </ul>
          </div>
  
          <!-- Resources -->
          <div class="footer-section">
            <h4>Resources</h4>
            <ul class="footer-links">
              <li><router-link to="/docs/theory">Theory</router-link></li>
              <li><router-link to="/docs/examples">Examples</router-link></li>
              <li><router-link to="/docs/api">API Reference</router-link></li>
            </ul>
          </div>
  
          <!-- Contact -->
          <div class="footer-section">
            <h4>Contact</h4>
            <ul class="contact-info">
              <li>
                <Mail class="icon" />
                <a href="mailto:contact@example.com">contact@example.com</a>
              </li>
              <li>
                <Github class="icon" />
                <a href="https://github.com/yourusername/lorentz-clock" target="_blank">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div class="copyright">
            © {{ new Date().getFullYear() }} Lorentz Clock. All rights reserved.
          </div>
          <div class="policy-links">
            <router-link to="/privacy">Privacy Policy</router-link>
            <span class="separator">|</span>
            <router-link to="/terms">Terms of Service</router-link>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { Github, Mail } from 'lucide-vue-next'
  </script>
  
  <style lang="scss" scoped>
  .page-footer {
    background: rgb(25, 25, 25);
    color: rgb(229, 229, 229);
    padding: 4rem 0 2rem;
  
    .footer-content {
      width: 100%;
    }
  
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 3rem;
      margin-bottom: 3rem;
    }
  
    .footer-section {
      h4 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: white;
      }
    }
  
    .brand {
      font-size: 1.5rem;
      color: white;
      margin-bottom: 0.5rem;
    }
  
    .tagline {
      color: #42b983;
      margin-bottom: 1rem;
    }
  
    .description {
      opacity: 0.8;
      margin-bottom: 1.5rem;
    }
  
    .footer-links {
      list-style: none;
      padding: 0;
  
      li {
        margin-bottom: 0.5rem;
      }
  
      a {
        color: rgb(229, 229, 229);
        text-decoration: none;
        transition: color 0.3s ease;
  
        &:hover {
          color: #42b983;
        }
      }
    }
  
    .contact-info {
      list-style: none;
      padding: 0;
  
      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
  
      a {
        color: rgb(229, 229, 229);
        text-decoration: none;
        transition: color 0.3s ease;
  
        &:hover {
          color: #42b983;
        }
      }
    }
  
    .icon {
      width: 20px;
      height: 20px;
    }
  
    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
  
      a {
        color: rgb(229, 229, 229);
        transition: color 0.3s ease;
  
        &:hover {
          color: #42b983;
        }
      }
    }
  
    .footer-bottom {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.5rem;
      gap: 1rem;
  
      .policy-links {
        display: flex;
        gap: 1rem;
  
        a {
          color: rgb(229, 229, 229);
          text-decoration: none;
          transition: color 0.3s ease;
  
          &:hover {
            color: #42b983;
          }
        }
  
        .separator {
          opacity: 0.5;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .footer-bottom {
      flex-direction: column;
      text-align: center;
  
      .policy-links {
        justify-content: center;
      }
    }
  }
  </style>