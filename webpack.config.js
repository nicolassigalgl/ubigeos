var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/app.js')
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.min.js'
    },
    resolve: {
        alias: {
            ubigeosService: path.resolve(__dirname, './src/services/ubigeos.js')
        }
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: false,
            minify: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ]
};