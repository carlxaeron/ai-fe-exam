const { defineConfig } = require('@vue/cli-service')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: config => {
    if (process.env.VUE_APP_PRERENDER === 'true') {
      config.plugins.push(
        new PrerenderSPAPlugin({
          // Absolute path to compiled SPA
          staticDir: path.join(__dirname, 'dist'),
          // List of routes to prerender
          routes: ['/'],
          renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
            renderAfterDocumentEvent: 'render-event',
            timeout: 60000, // Increase timeout to 60 seconds
            headless: true, // Run in headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Additional arguments
          })
        })
      )
    }
  }
})