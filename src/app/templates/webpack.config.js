import webpack from 'webpack'

export default {
  devtool: 'source-map',
  entry: './src/index',<% if (react) { %>
  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
  },<% } %>
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
    }],
  },
  output: {
    path: 'dist',
    filename: '<%= name %>.min.js',
    library: '<%= name %>',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false, screw_ie8: true},
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}
