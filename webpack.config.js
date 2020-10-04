const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const TerserPlugin = require("terser-webpack-plugin");

const autoInjectVersionConfig = {
  SILENT: true,
  SHORT: 'p5.cv',
  components: {
    AutoIncreaseVersion: false,
    InjectAsComment: true,
    InjectByTag: false
  },
  componentsOptions: {
    InjectAsComment: {
      tag: 'Version: {version} - {date}',
      dateFormat: 'yyyy-mm-dd',
      multiLineCommentType: true,
    },
  }
};

module.exports = {
  context: __dirname + '/src',
  entry: {
    'p5.cv': './app.js',
    'p5.cv.min': './app.js'
  },
  output: {
    // where we want to output built files
    path: __dirname + "/lib"
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: true,
  },
  plugins: [
    
  ],
  module: {
    rules: [
      {
        test: /node_modules(\.*)/,
        use: {
          loader: 'uglify-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: [/\.min\.js$/],
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          ecma: 6,
          mangle: true,
          output: {
            comments: false
          }
        },
        sourceMap: true,
      })
      // new TerserPlugin({ sourceMap: true })
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  // FFS webpack
  node: {
    fs: 'empty'
  }
}
