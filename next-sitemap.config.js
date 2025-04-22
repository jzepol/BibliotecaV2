/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://biblioaguero.com.ar',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    sitemapSize: 5000,
    exclude: ['/dashboard'],
  }
  