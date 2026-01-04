import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import { Configuration, WebpackPluginInstance, ExternalItem } from 'webpack';
import NodemonPlugin from 'nodemon-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

module.exports = (env: Record<string, unknown>): Configuration => {
    const extensions = ['.ts', '.js'];
    const plugins: WebpackPluginInstance[] = [new CleanWebpackPlugin(), new ForkTsCheckerWebpackPlugin()];
    if (!env.production) {
        plugins.push(new NodemonPlugin());
    }
    return {
        module: {
            rules: [
                {
                    exclude: [path.resolve(__dirname, 'node_modules')],
                    test: /\.ts$/,
                    use: 'babel-loader',
                },
            ],
        },
        output: {
            filename: 'server.js',
            path: path.resolve(__dirname, './dist'),
        },
        resolve: {
            plugins: [
                // TODO: remove "any" once https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61 is done
                new TsconfigPathsPlugin({
                    extensions,
                }) as any,
            ],
            extensions,
        },
        target: 'node',
        externalsPresets: { node: true },
        externals: [nodeExternals({}) as any],
        mode: env.production ? 'production' : 'development',
        plugins,
        watch: !env.production,
        devtool: env.production ? 'source-map' : 'inline-source-map',
    };
};
