import { svgToDataUrl, svgToBase64DataUrl } from './utils/svgConverter';
import DEFAULT_SVG from './assets/pattern.svg'

// Get DOM elements
const svgInput = document.getElementById('svgInput');
const outputType = document.getElementById('outputType');
const output = document.getElementById('output');
const copyButton = document.getElementById('copyButton');
const preview = document.getElementById('preview');

// Initialize with default SVG
svgInput.value = DEFAULT_SVG;

// Convert and update function
function updateOutput() {
    const svg = svgInput.value;
    const converter = outputType.value === 'url' ? svgToDataUrl : svgToBase64DataUrl;
    const converted = converter(svg);
    
    // Update output
    output.value = converted;
    
    // Update preview
    preview.innerHTML = svg;
}

// Event listeners
svgInput.addEventListener('input', updateOutput);
outputType.addEventListener('change', updateOutput);

copyButton.addEventListener('click', async () => {
    await navigator.clipboard.writeText(output.value);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy';
    }, 2000);
});

// Initial conversion
updateOutput();

// File: src/utils/svgConverter.js
export function svgToDataUrl(svgContent) {
    svgContent = svgContent.replace(/xmlns=".*?"/g, '');
    
    if (!svgContent.includes('xmlns=')) {
        svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const encoded = svgContent
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/"/g, "'")
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E');

    return `data:image/svg+xml,${encoded}`;
}