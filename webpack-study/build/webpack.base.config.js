const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      
    ]
  },
  plugins: [
    
  ]
}