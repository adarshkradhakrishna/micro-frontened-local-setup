const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
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
        port: 3002,
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
                name: 'shared_header',
                filename:'remoteEntry.js',
                exposes:{
                    './HeaderComponent':'./src/components/HeaderComponent'
                },
                shared: {
                    react: {
                        requiredVersion: '^19.1.1',
                        singleton: true,
                        eager:false
                    },
                    'react-dom': {
                        requiredVersion: '^19.1.1',
                        singleton: true,
                        eager:false
                    }
                },
            }
        ),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: "index.html"
        }),
    ],


}