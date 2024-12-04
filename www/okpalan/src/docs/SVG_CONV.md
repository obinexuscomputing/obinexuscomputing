# SVG Converter Utilities

A lightweight JavaScript utility library for converting SVG content to data URLs and base64 encoded data URLs. These utilities are useful for embedding SVG images inline in HTML, CSS, or JavaScript applications.


```javascript
import { svgToDataUrl, svgToBase64DataUrl, updateOutput } from './svg-converter';
```

## API Reference

### `svgToDataUrl(svgContent: string): string`

Converts SVG content to a URL-encoded data URL.

- **Parameters:**
  - `svgContent`: String containing valid SVG markup
- **Returns:** URL-encoded data URL string
- **Example:**
```javascript
const svg = '<svg><circle cx="50" cy="50" r="40"/></svg>';
const dataUrl = svgToDataUrl(svg);
// Result: data:image/svg+xml,...
```

### `svgToBase64DataUrl(svgContent: string): string`

Converts SVG content to a base64-encoded data URL.

- **Parameters:**
  - `svgContent`: String containing valid SVG markup
- **Returns:** Base64-encoded data URL string
- **Example:**
```javascript
const svg = '<svg><circle cx="50" cy="50" r="40"/></svg>';
const base64Url = svgToBase64DataUrl(svg);
// Result: data:image/svg+xml;base64,...
```

### `updateOutput(): void`

Updates output and preview based on input SVG content and selected conversion type.

## Usage Examples

### Basic Usage

```javascript
// Convert SVG to URL-encoded data URL
const svgContent = `
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" stroke="black" fill="red"/>
</svg>`;

const dataUrl = svgToDataUrl(svgContent);
```

### Using with HTML Elements

```javascript
// HTML
<textarea id="svgInput"></textarea>
<select id="outputType">
    <option value="url">URL Encoded</option>
    <option value="base64">Base64</option>
</select>
<textarea id="output"></textarea>
<div id="preview"></div>

// JavaScript
document.getElementById('svgInput').addEventListener('input', updateOutput);
document.getElementById('outputType').addEventListener('change', updateOutput);
```

### Using in CSS

```javascript
const svgContent = `<svg>...</svg>`;
const dataUrl = svgToDataUrl(svgContent);

// Apply as background image
element.style.backgroundImage = `url("${dataUrl}")`;
```

### Using in Image Elements

```javascript
const svgContent = `<svg>...</svg>`;
const base64Url = svgToBase64DataUrl(svgContent);

const img = new Image();
img.src = base64Url;
document.body.appendChild(img);
```

## Features

- Automatic xmlns attribute handling
- Special character encoding
- Support for both URL and base64 encoding
- Live preview support
- Error handling for invalid SVG input

## Best Practices

1. **Input Validation**
   ```javascript
   if (!svgContent.trim().startsWith('<svg')) {
       throw new Error('Invalid SVG content');
   }
   ```

2. **Error Handling**
   ```javascript
   try {
       const dataUrl = svgToDataUrl(svgContent);
   } catch (error) {
       console.error('SVG conversion failed:', error);
   }
   ```

3. **Performance Optimization**
   ```javascript
   // Cache converted results for large SVGs
   const cache = new Map();
   
   function getCachedDataUrl(svgContent) {
       if (!cache.has(svgContent)) {
           cache.set(svgContent, svgToDataUrl(svgContent));
       }
       return cache.get(svgContent);
   }
   ```

## Common Issues and Solutions

### Issue: Missing xmlns Attribute
```javascript
// The converter automatically adds xmlns if missing
const svg = '<svg><rect width="100" height="100"/></svg>';
const dataUrl = svgToDataUrl(svg);
// xmlns="http://www.w3.org/2000/svg" is automatically added
```

### Issue: Special Characters
```javascript
// Special characters are automatically encoded
const svg = '<svg><text>#Special&Characters</text></svg>';
const dataUrl = svgToDataUrl(svg);
// Characters like #, %, <, > are properly encoded
```

## Browser Compatibility

- Chrome 49+
- Firefox 52+
- Safari 10+
- Edge 14+
- IE 11 (with polyfill for btoa)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push o