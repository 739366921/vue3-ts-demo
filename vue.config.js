const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  outputDir: "docs",
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  devServer: {
    port: 8010,
    proxy: {
      '/api': {
        // 本地服务接口地址
        ws: true,
        changeOrigin:true,
        target: 'https://api.pingcc.cn',
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
})
