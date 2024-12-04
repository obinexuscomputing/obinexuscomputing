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

export function svgToBase64DataUrl(svgContent) {
    svgContent = svgContent.replace(/xmlns=".*?"/g, '');
    
    if (!svgContent.includes('xmlns=')) {
        svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const base64 = btoa(svgContent);
    return `data:image/svg+xml;base64,${base64}`;
}