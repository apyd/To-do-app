const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './src/client/app.js'],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": ["@babel/preset-env"],
                        "plugins": ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.pug$/,
                use: ['html-loader?attrs=false', 'pug-html-loader']
              }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve('./src/server/templates/', 'index.pug'),
        inject: false
    }),
    new HtmlWebpackPlugin({
        filename: 'login.html',
        template: path.resolve('./src/server/templates/', 'login.pug'),
        inject: false
    }),
    new HtmlWebpackPlugin({
        filename: 'register.html',
        template: path.resolve('./src/server/templates/', 'register.pug'),
        inject: false
    })
],
}