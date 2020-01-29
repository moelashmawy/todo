const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: '#eval-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};