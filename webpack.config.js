var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

// webpack plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var ProvidePlugin = webpack.ProvidePlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DedupePlugin = webpack.optimize.DedupePlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: path.join(__dirname, 'app'),
    entry: {
        index: './javascripts/pages/index.js'
    },
    output: {
        path: path.join(__dirname, 'app/dist'),
        filename: '[name]-prod.js'
    },
    plugins: [
        new DedupePlugin(),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new UglifyJsPlugin(),
        new CommonsChunkPlugin('shared', 'shared.js'),
        new ExtractTextPlugin("[name]-styles.css")
    ],
    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader")
            }, {
                test: /\.woff/,
                loader: "file-loader"
            }, {
                test: /\.woff2/,
                loader: "file-loader"
            }, {
                test: /\.ttf/,
                loader: "file-loader"
            }, {
                test: /\.eot/,
                loader: "file-loader"
            }, {
                test: /\.svg/,
                loader: "file-loader"
            }, {
                test: /\.scss$/,
                exclude: '/node_modules/',
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }, {
                test: /\.html$/,
                loader: "html-loader?minimize=true&conservativeCollapse=false"
            }
        ]
    },
    postcss: function () {
        return [autoprefixer]
    },
    resolve: {
        extensions: ['', '.js', '.css', '.scss'],
        modulesDirectories: [
            'app',
            'node_modules'
        ]
    },
    watch: true
};