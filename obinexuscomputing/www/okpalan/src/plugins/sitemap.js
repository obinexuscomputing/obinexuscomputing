import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import prettier from 'prettier'

/**
 * @typedef {Object} SitemapConfig
 * @property {string} siteUrl - Base URL of the site
 * @property {string} distDir - Distribution directory path
 * @property {string[]} include - Glob patterns to include
 * @property {string[]} exclude - Glob patterns to exclude
 * @property {string} changefreq - Change frequency for sitemap
 * @property {number} priority - Priority for sitemap entries
 * @property {string} outputFile - Output filename for sitemap
 */

/** @type {SitemapConfig} */
const config = {
  siteUrl: 'https://obinexuscomputing.org',
  distDir: 'dist',
  include: ['**/*.html'],
  exclude: ['404.html', 'private/**'],
  changefreq: 'weekly',
  priority: 0.7,
  outputFile: 'sitemap.xml'
}

/**
 * Generates sitemap XML file based on the provided configuration
 * @returns {Promise<void>}
 */
async function generateSitemap() {
  const files = glob.sync(config.include, {
    cwd: config.distDir,
    ignore: config.exclude
  })

  const sitemapEntries = files.map(file => {
    const url = path.join(config.siteUrl, file)
      .replace(/\\/g, '/') // Convert Windows paths
      .replace('/index.html', '/') // Clean up index.html
    const stats = fs.statSync(path.join(config.distDir, file))
    const lastmod = stats.mtime.toISOString()

    return `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${config.changefreq}</changefreq>
        <priority>${config.priority}</priority>
      </url>
    `
  }).join('')

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries}
    </urlset>
  `

  const formattedSitemap = await prettier.format(sitemap, {
    parser: 'html',
    printWidth: 120
  })

  fs.writeFileSync(
    path.join(config.distDir, config.outputFile),
    formattedSitemap
  )

  console.log(`Sitemap generated at ${config.outputFile}`)
}

/**
 * Validates sitemap configuration
 * @throws {Error} If configuration is invalid
 */
function validateConfig() {
  if (!config.siteUrl) {
    throw new Error('siteUrl is required in config')
  }
  if (!fs.existsSync(config.distDir)) {
    throw new Error(`Distribution directory ${config.distDir} does not exist`)
  }
}

/**
 * Vite plugin for generating sitemaps
 * @param {Partial<SitemapConfig>} userConfig - User provided configuration
 * @returns {import('vite').Plugin} Vite plugin object
 */
export function vitePluginSitemap(userConfig = {}) {
  Object.assign(config, userConfig)

  return {
    name: 'vite-plugin-sitemap',
    closeBundle: async () => {
      try {
        validateConfig()
        await generateSitemap()
      } catch (error) {
        console.error('Error generating sitemap:', error)
      }
    }
  }
}