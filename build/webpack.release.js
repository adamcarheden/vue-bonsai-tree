const webpack = require( 'webpack' )
const path = require('path')
const projectRoot = path.resolve(__dirname, '../')

module.exports = {
  entry: './src/index.js',
  output: {
    path: projectRoot,
    filename: 'vue-bonsai-tree.js',
    library: 'vue-bonsai-tree',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [ '', '.js', '.vue' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    } )
  ]
}
