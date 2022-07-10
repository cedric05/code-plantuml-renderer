const path = require('path');

const outputFilename = 'plantuml.js';

module.exports = (env, argv) => ({
  mode: argv.mode,
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: './src/plantuml.ts',
  output: {
    path: path.join(__dirname, 'out'),
    filename: outputFilename,
    publicPath: '',
    libraryTarget: 'module',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  experiments: {
      outputModule: true,
  },
  module: {
    rules: [
      // Allow importing ts(x) files:
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: path.join(__dirname, 'tsconfig.json'),
          // transpileOnly enables hot-module-replacement
          transpileOnly: true,
          compilerOptions: {
            // Overwrite the noEmit from the client's tsconfig
            noEmit: false,
          },
        },
      },
    ],
  },
});