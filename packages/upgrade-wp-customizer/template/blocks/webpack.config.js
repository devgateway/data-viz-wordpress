const path = require("path");
const webpack = require('webpack');

const defaultConfig = require("@wordpress/scripts/config/webpack.config");
module.exports = {
    ...defaultConfig,
    entry: {
        index: path.resolve(process.cwd(), './', 'index.js'),
    },
    optimization: {
        ...defaultConfig.optimization,
        minimize: false,

    }
};
