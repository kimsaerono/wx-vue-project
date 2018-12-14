// 在控制台运行npm run structure 来生成staticProd文件夹用来打包成public
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const chalk = require('chalk')
const ora = require('ora')
const spinner = ora('Copy for static...')
spinner.start();

const webpackCopyConfig = {
  entry: {
    app: './src/main.js'
  },
  plugins:[
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: path.resolve(__dirname , "../staticProd"),
        ignore: ['.*']
      }
    ])
  ]
}
webpack(webpackCopyConfig,(err, stats) => {
  spinner.stop();
  console.log(chalk.cyan('  Copy complete.\n'))
  console.log(chalk.yellow(
    '  Tip: Copy files have already exist in your project '
  ))
})


