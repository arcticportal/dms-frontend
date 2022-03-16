
const path = require('path');
const webpack = require('webpack');

const cesiumSource = '../node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const cesiumAssets = '../Build/Cesium/Assets';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'static', 'js'),
        filename: 'bundle.js',
        publicPath: './static/js',

        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },
    resolve: {
        alias: {
            // CesiumJS module name
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: ['url-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
        new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumAssets), to: 'Assets' } ]),
        new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ]),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        }),
        // Split cesium into a separate bundle
        new webpack.optimize.CommonsChunkPlugin({
            name: 'cesium',
            minChunks: function (module) {
                return module.context && module.context.indexOf('cesium') !== -1;
            }
        })
    ],
};