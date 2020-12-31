const path = require('path');

module.exports = {
  entry: {
    main: [ 'babel-polyfill', './client/main.js' ]
  },
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, './public/dist'),
  },
  devtool: 'source-map',  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react' ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  }
}
