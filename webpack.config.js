const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: process.env.NODE_ENV,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        publicPath: '/dist/',
        proxy: {
            '/': 'http://localhost:3000'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                //Question mark after character means proceeding can or cannot be included
                    //Matches .scss as well as .css
                test: /\.s?css$/,
                exclude: /(node_modules)/,
                use: [ 'style-loader','css-loader','sass-loader']
            }
        ]
    }
};