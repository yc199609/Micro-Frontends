module.exports = {
  lintOnSave: 'warning',
  // productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7000', // 域名
        // ws: true, // 是否启用websockets
        changOrigin: true,
        pathRewrith: {
          '^/api': '/api',
        },
        // logLevel: 'debug'
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/common/mixin.scss";',
      },
    },
  },
};
