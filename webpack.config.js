const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (process.env.NODE_ENV !== 'development') {
        config.minimizer = [
            new OptimizeCssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: [
        path.resolve(__dirname, 'src/app.js')
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components')
        }
    },
    devServer: {
        port: 4200,
        watchFiles: ["src/*.html"],
        hot: true,
    },
    optimization: optimization(),
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            modify: {
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    } 
                }
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, 'css-loader']
            },
        ]
    },
    devtool: 'source-map'
}
