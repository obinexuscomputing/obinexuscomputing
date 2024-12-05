import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

/**
 * Generate sitemap XML content
 * @param {string[]} urls - List of URLs to include
 * @param {Object} options - Sitemap options
 * @returns {string} Formatted XML content
 */
export function generateSitemapXML(urls, options = {}) {
  const { baseUrl, changefreq = 'weekly', priority = 0.7 } = options
  
  const urlEntries = urls.map(url => {
    const fullUrl = new URL(url, baseUrl).toString()
    return `
      <url>
        <loc>${fullUrl}</loc>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `
  }).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlEntries}
    </urlset>`
}

export function writeSitemapFile(content, outputPath) {
  fs.writeFileSync(outputPath, content)
}
