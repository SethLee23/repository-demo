// vue.config.js
module.exports = {
  publicPath: "./", //vue-cli3.3+新版本使用
  //输出文件目录
  outputDir: process.env.outputDir || "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // devServer: {
  //   open: true,
  //   host: 'localhost',
  //   port: 8080,
  //   https: false,
  //   //以上的ip和端口是我们本机的;下面为需要跨域的
  //   proxy: {  //配置跨域
  //     '/api': {
  //       target: '',  //这里后台的地址模拟的;应该填写你们真实的后台接口
  //       ws: true,
  //       changOrigin: true,  //允许跨域
  //       pathRewrite: {
  //         '^/api': ''  //请求的时候使用这个api就可以
  //         // '^api': ''
  //       }
  //     }
  //   }
  // },
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin("define").tap(args => {
      args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
      return args;
    });
  }
};
