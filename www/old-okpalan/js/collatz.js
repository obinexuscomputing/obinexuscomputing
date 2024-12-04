// CollatzCalculator class
class CollatzCalculator {
    constructor() {
        this.sequence = [];
        this.metadata = {
            evenCount: 0,
            oddCount: 0,
            maxValue: 0,
            steps: 0
        };
    }

    calculate(start) {
        this.sequence = [];
        this.metadata = {
            evenCount: 0,
            oddCount: 0,
            maxValue: start,
            steps: 0
        };

        let current = start;
        let step = 0;

        while (current !== 1 && step < 1000) {
            const isEven = current % 2 === 0;
            
            this.sequence.push({
                step,
                value: current,
                path: isEven ? 'even' : 'odd',
                probability: Math.exp(-step / 50),
                amplitude: Math.sqrt(1 / current),
                energy: Math.log2(current)
            });

            if (isEven) {
                this.metadata.evenCount++;
                current = current / 2;
            } else {
                this.metadata.oddCount++;
                current = 3 * current + 1;
            }

            this.metadata.maxValue = Math.max(this.metadata.maxValue, current);
            step++;
        }

        // Add final state
        this.sequence.push({
            step,
            value: 1,
            path: 'even',
            probability: Math.exp(-step / 50),
            amplitude: 1,
            energy: 0
        });

        this.metadata.steps = this.sequence.length;
        return {
            sequence: this.sequence,
            metadata: this.metadata
        };
    }
}

// CollatzVisualizer class
class CollatzVisualizer {
    constructor(containerId) {
        this.containerId = containerId;
        this.margin = { top: 40, right: 40, bottom: 60, left: 60 };
        this.width = 0;
        this.height = 0;
        this.svg = null;
        this.xScale = null;
        this.yScale = null;
        this.currentData = null;
        this.currentMode = 'trajectory';
        this.observer = null;
        this.init();
        this.setupObserver();
    }

    setupObserver() {
        // Create observer to watch for view mode changes
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'data-mode' && 
                    this.currentData) {
                    const newMode = mutation.target.getAttribute('data-mode');
                    this.updateVisualization(this.currentData, newMode);
                }
            });
        });

        // Start observing the container for attribute changes
        const container = document.getElementById(this.containerId);
        this.observer.observe(container, {
            attributes: true,
            attributeFilter: ['data-mode']
        });
    }

    init() {
        const container = d3.select(`#${this.containerId}`);
        container.selectAll("*").remove();

        this.width = container.node().getBoundingClientRect().width - this.margin.left - this.margin.right;
        this.height = 400 - this.margin.top - this.margin.bottom;

        this.svg = container.append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    }

    updateVisualization(data, mode = 'trajectory') {
        this.currentData = data;
        this.currentMode = mode;
        this.init();

        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, this.width]);

        let yScale;
        let yData;

        // Determine y-axis scale based on view mode
        switch (mode) {
            case 'probability':
                yData = d => d.probability;
                yScale = d3.scaleLinear()
                    .domain([0, 1])
                    .range([this.height, 0]);
                break;
            case 'amplitude':
                yData = d => d.amplitude;
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.amplitude)])
                    .range([this.height, 0]);
                break;
            case 'energy':
                yData = d => d.energy;
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.energy)])
                    .range([this.height, 0]);
                break;
            default: // trajectory
                yData = d => d.value;
                yScale = d3.scaleLog()
                    .domain([1, d3.max(data, d => d.value)])
                    .range([this.height, 0]);
        }

        // Add axes
        this.svg.append("g")
            .attr("transform", `translate(0,${this.height})`)
            .call(d3.axisBottom(xScale).ticks(5))
            .append("text")
            .attr("x", this.width / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .text("Steps");

        this.svg.append("g")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("fill", "black")
            .text(mode.charAt(0).toUpperCase() + mode.slice(1));

        // Draw line
        const line = d3.line()
            .x(d => xScale(d.step))
            .y(d => yScale(yData(d)));

        this.svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#3498db")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Add points
        this.svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.step))
            .attr("cy", d => yScale(yData(d)))
            .attr("r", 4)
            .attr("fill", d => d.path === 'even' ? "#3498db" : "#e74c3c");
    }

    resize() {
        if (this.currentData) {
            this.init();
            this.updateVisualization(this.currentData, this.currentMode);
        }
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Enhanced main execution
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new CollatzCalculator();
    const visualizer = new CollatzVisualizer('chart');
    
    const startNumberInput = document.getElementById('startNumber');
    const calculateBtn = document.getElementById('calculateBtn');
    const viewModeSelect = document.getElementById('viewMode');
    const loadingOverlay = document.getElementById('loading');
    const chartContainer = document.getElementById('chart');

    const updateStats = (metadata) => {
        document.getElementById('stepCount').textContent = metadata.steps;
        document.getElementById('maxValue').textContent = metadata.maxValue.toLocaleString();
        document.getElementById('evenCount').textContent = metadata.evenCount;
        document.getElementById('oddCount').textContent = metadata.oddCount;
    };

    const calculate = () => {
        const startNumber = parseInt(startNumberInput.value);
        if (startNumber < 1) {
            alert('Please enter a positive integer');
            return;
        }

        loadingOverlay.classList.add('active');
        
        setTimeout(() => {
            const result = calculator.calculate(startNumber);
            chartContainer.setAttribute('data-mode', viewModeSelect.value);
            visualizer.updateVisualization(result.sequence, viewModeSelect.value);
            updateStats(result.metadata);
            loadingOverlay.classList.remove('active');
        }, 100);
    };

    calculateBtn.addEventListener('click', calculate);
    viewModeSelect.addEventListener('change', (e) => {
        chartContainer.setAttribute('data-mode', e.target.value);
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            visualizer.resize();
        }, 250);
    });

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        visualizer.destroy();
    });

    // Initial calculation
    calculate();
});