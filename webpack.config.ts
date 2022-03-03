import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import  { Configuration, WebpackPluginInstance } from 'webpack';
import NodemonPlugin from 'nodemon-webpack-plugin';
import nodeExternals from 'webpack-node-externals';


module.exports = (env: Record<string, unknown>): Configuration => {
    const plugins : WebpackPluginInstance[] = [new CleanWebpackPlugin()];
    if (!env.production) {
        plugins.push(new NodemonPlugin());
    }
  return {
    module: {
        rules: [
          {
            exclude: [path.resolve(__dirname, 'node_modules')],
            test: /\.ts$/,
            use: 'babel-loader'
          }
        ]
      },
      output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist')
      },
      resolve: {
        extensions: ['.ts', '.js']
      },
      target: 'node',
      externalsPresets: { node: true },
      externals: [nodeExternals({})],
      mode: env.production ? 'production' : 'development',
      plugins,
      watch: !env.production,
      devtool: env.production ? 'source-map' : 'inline-source-map',
  };
};