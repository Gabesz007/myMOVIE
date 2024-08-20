const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    entry: './app.js',
    mode: 'development',
    output: {
        path: DIST_DIR,
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './index.html', to: DIST_DIR },
                { from: "./assets", to: path.resolve(DIST_DIR, "assets") },
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
        ]
    },
    devServer: {
        static: {
            directory: DIST_DIR
        },
        port: 9000,
        proxy: {
            '/api': {
                target: 'https://api.tvmaze.com',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }, 
                secure: false, 
            },
        }
    },
}
