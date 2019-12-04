const path = require("path");
const common = require('./webpack.common');
const merge = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080"
        }
    }
});