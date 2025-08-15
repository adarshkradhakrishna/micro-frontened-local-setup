const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const SHARED_HEADER_REMOTE_PATH = process.env.SHARED_HEADER_REMOTE_PATH ?? 'http://localhost:3002/'
module.exports = {
    entry: './src/index.tsx',
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "auto",
        clean: true
    },
    devServer: {
        historyApiFallback: true,
        port: 3001,
    },
    resolve: {
        alias: {
            react: path.resolve(__dirname, 'node_modules/react'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin(
            {
                name: 'app_shell',
                remotes: {
                    shared_header: `shared_header@${SHARED_HEADER_REMOTE_PATH}`,
                },
                shared: {
                    react: {
                        requiredVersion: '^19.1.1',
                        singleton: true,
                        eager:true
                    },
                    'react-dom': {
                        requiredVersion: '^19.1.1',
                        singleton: true,
                        eager:true
                    }
                }
            }
        ),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: "index.html"
        }),

    ],


}