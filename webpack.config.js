module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: './public/bundle.js',
    path: __dirname
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  }
};
