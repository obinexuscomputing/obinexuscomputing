# Relativistic Clock Visualization

A JavaScript implementation of a relativistic clock that visualizes time dilation according to special relativity using the Lorentz factor. This project creates two synchronized SVG clocks showing proper time and dilated time for objects moving at high velocities.

## Table of Contents

- [Theory](#theory)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

## Theory

The visualization is based on the special relativity time dilation effect, where:

- Time dilation is calculated using the Lorentz factor (γ):
  γ = 1/√(1 - v²/c²)
- Dilated time = Proper time × γ
- v is the relative velocity between reference frames
- c is the speed of light (299,792,458 m/s)

## Installation

1. Include the required files in your HTML:

```html
<div id="clock"></div>
<script src="lorentz-clock.js"></script>
```

2. Optional: Add custom styling:

```css
#clock {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 20px;
}
```

## Usage

Basic implementation:

```javascript
// Initialize clock with velocity components
const velocity = { 
    x: 50000,  // meters per second
    y: 369000, 
    z: 481000 
};
const c = 299792458; // speed of light in m/s

// Create clock instance
const clock = new RelativisticClock("clock", velocity, c);

// Start the clock
clock.start();
```

## Configuration

You can customize various aspects of the clock:

```javascript
// Custom configuration example
const config = {
    velocity: {
        x: 50000,    // m/s
        y: 369000,   // m/s
        z: 481000    // m/s
    },
    styling: {
        properClock: {
            faceColor: 'white',
            handColor: 'black',
            borderColor: 'black'
        },
        dilatedClock: {
            faceColor: '#f0f0f0',
            handColor: 'blue',
            borderColor: 'blue'
        }
    },
    updateInterval: 1000  // milliseconds
};

const clock = new RelativisticClock("clock", config);
```

## Examples

1. Basic Implementation:

```javascript
// Simple clock with default settings
const velocity = { x: 50000, y: 0, z: 0 };
const clock = new RelativisticClock("clock", velocity, c);
clock.start();
```

2. High-Velocity Example:

```javascript
// Clock showing significant time dilation
const highVelocity = { 
    x: 200000000, 
    y: 150000000, 
    z: 100000000 
};
const clock = new RelativisticClock("clock", highVelocity, c);
clock.start();
```

3. Custom Styling:

```javascript
const clock = new RelativisticClock("clock", velocity, c);
clock.setStyle({
    properClock: {
        faceColor: '#ffffff',
        handColor: '#000000'
    },
    dilatedClock: {
        faceColor: '#f0f0f0',
        handColor: '#0000ff'
    }
});
clock.start();
```

## API Reference

### RelativisticClock

Main class for clock management.

#### Methods:

- `constructor(elementId, velocity, c)`: Initialize clock
- `start()`: Start the clock visualization
- `stop()`: Stop the clock
- `setStyle(styleConfig)`: Update clock styling
- `updateTime()`: Update clock times manually
- `getGamma()`: Get current Lorentz factor

#### Properties:

- `element`: DOM element containing clocks
- `gamma`: Calculated Lorentz factor
- `startTime`: Initial timestamp
- `isRunning`: Clock running state

### Helper Functions

- `calculateLorentzFactor(velocity, c)`: Calculate γ
- `calculateDilatedTime(properTime, gamma)`: Calculate dilated time
- `updateClockSVG(properTime, dilatedTime)`: Update clock visualization

## Troubleshooting

Common issues and solutions:

1. **Clocks not appearing:**
   - Verify DOM element ID matches constructor parameter
   - Check for JavaScript errors in console
   - Ensure SVG support in browser

2. **Incorrect time dilation:**
   - Verify velocity units (should be m/s)
   - Check velocity magnitude (should be < c)
   - Validate Lorentz factor calculation

3. **Performance issues:**
   - Reduce update interval
   - Optimize animation code
   - Check browser CPU usage

## Limitations

- Velocities must be significantly less than c
- Numerical precision limited by JavaScript floating-point arithmetic
- Animation performance dependent on browser capabilities

## Contributing

Feel free to submit issues and enhancement requests via the project repository.

## License

MIT License - feel free to use this code in your projects.