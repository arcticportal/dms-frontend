const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    devServer: {
        hot: true,
    },
    devtool: 'cheap-module-source-map', // create-react-app recommends this option for dev
    // devtool: 'eval', // recommended for Cesium
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ]
}
