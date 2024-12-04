'use strict';

export function calculateLorentzFactor(velocity, c) {
    // Calculate v^2 by summing squares of components
    const v2 = Object.values(velocity).reduce((sum, component) => 
        sum + component * component, 0);
    
    // Calculate γ = 1/√(1 - v²/c²)
    const beta2 = v2 / (c * c);
    if (beta2 >= 1) {
        throw new Error('Velocity cannot equal or exceed speed of light');
    }
    
    return 1 / Math.sqrt(1 - beta2);
}

export function calculateDilatedTime(properTime, gamma) {
    return properTime * gamma;
}

export class RelativisticClock {
    constructor(clockId, velocity, c) {
        this.element = document.getElementById(clockId);
        this.gamma = calculateLorentzFactor(velocity, c);
        this.startTime = Date.now();
    }

    updateTime() {
        const elapsedProperTime = Date.now() - this.startTime;
        const dilatedTime = calculateDilatedTime(elapsedProperTime, this.gamma);
        
        return {
            proper: new Date(this.startTime + elapsedProperTime),
            dilated: new Date(this.startTime + dilatedTime)
        };
    }
}

export function updateClockSVG(properTime, dilatedTime) {
    // Convert times to angles
    function timeToAngles(date) {
        const hours = date.getHours() % 12;
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        return {
            hour: (hours + minutes/60) * 30,    // 360° ÷ 12 = 30° per hour
            minute: minutes * 6,                // 360° ÷ 60 = 6° per minute
            second: seconds * 6                 // 360° ÷ 60 = 6° per second
        };
    }



    // Update both clocks
    const properAngles = timeToAngles(properTime);
    const dilatedAngles = timeToAngles(dilatedTime);
    
    updateHands('proper', properAngles);
    updateHands('dilated', dilatedAngles);
}

export function updateHands(prefix, angles) {
    const hands = {
        hour: document.getElementById(`${prefix}HourHand`),
        minute: document.getElementById(`${prefix}MinuteHand`),
        second: document.getElementById(`${prefix}SecondHand`)
    };

    // Update hand rotations
    for (const [type, hand] of Object.entries(hands)) {
        if (hand) {
            const angle = angles[type];
            hand.setAttribute('transform', `rotate(${angle})`);
        }
    }
}