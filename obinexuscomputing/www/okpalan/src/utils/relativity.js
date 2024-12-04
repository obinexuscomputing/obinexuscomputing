/**
 * Calculate the Lorentz factor (γ) for a given velocity
 * @param {Object} velocity - Velocity components
 * @param {number} c - Speed of light
 * @returns {number} Lorentz factor
 */
export function calculateLorentzFactor(velocity, c) {
    // Calculate v^2 by summing squares of components
    const v2 = Object.values(velocity).reduce((sum, component) => 
      sum + component * component, 0)
    
    // Calculate γ = 1/√(1 - v²/c²)
    const beta2 = v2 / (c * c)
    if (beta2 >= 1) {
      throw new Error('Velocity cannot equal or exceed speed of light')
    }
    
    return 1 / Math.sqrt(1 - beta2)
  }
  
  /**
   * Calculate dilated time based on proper time and Lorentz factor
   * @param {number} properTime - Time in rest frame
   * @param {number} gamma - Lorentz factor
   * @returns {number} Dilated time
   */
  export function calculateDilatedTime(properTime, gamma) {
    return properTime * gamma
  }
  
  /**
   * Calculate velocity components from magnitude and direction
   * @param {number} magnitude - Velocity magnitude
   * @param {number} theta - Angle in radians
   * @param {number} phi - Angle in radians
   * @returns {Object} Velocity components
   */
  export function calculateVelocityComponents(magnitude, theta, phi) {
    return {
      x: magnitude * Math.sin(theta) * Math.cos(phi),
      y: magnitude * Math.sin(theta) * Math.sin(phi),
      z: magnitude * Math.cos(theta)
    }
  }