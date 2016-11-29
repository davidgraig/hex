module.exports = {  
  entry: './src/Game.ts',
  output: {
    filename: 'bundle.js',
    path: './bin/js/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
