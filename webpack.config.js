const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'block3d.min.js',
    path: path.resolve(process.cwd(), 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    hot: true,
    inline: true
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'test/**/*', to: '[name].[ext]' }
    ])
  ]
}