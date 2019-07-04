//The path module provides utilities for working with file and directory paths
//When Node invokes that require() function with a local file path as the function’s only argument
//this module is used for it's ability to prevent file system issues between OS systems
//Usually coupled with __dirnmae global variable
    //this provides the name of the directory of the current module
const path = require('path');
//Node.js is based on the CommonJS module system
//All files are considered modules
//Each of the modules exposes a module.exports global variable that we can assign objects holding methods or functions
//By default, it's an empty object
module.exports = {
    //if 'entry' left unassigned, it assumes the entry point will be 'scr/index.js'
    //this is the module that webpack begins at to build out it's dependency graph
    //figues out all dependencies as it weaves through all associated files and all files associated with those
    entry: './src/index.js',
    //mode property is assigned development, production, or none
    //webpack responds to this setting accordingly
    mode: process.env.NODE_ENV,
    //webpack default 'output' is 'dist/main.js'
    //if in 'production mode', file outputted will be uglified and minified
    output: {
        //path property tells webpack which directory to put the outputted bundle
        path: path.resolve(__dirname, 'dist'),
        //filename property names the bundle to be outputted
        filename: 'bundle.js'
    },
    //allows for us to be able to quickly develop an app
    //we are given a simple web server and the ability for hot module reloading
    devServer: {
        //publicPath is where the bundled files will be serverd from
        publicPath: '/dist/',
        //proxy is for if we have a separate backend development environment that allows us to send API requests on the same domain
        //with a backend on keys stored in this object, we enable proxying
        proxy: {
            '/': 'http://localhost:3000'
        }
    },
    //module is the configuration regarding modules
    //we specifiy how to handle certain modules with certain file extensions
    //gives us the ability to determine what loaders to use on what files
    module: {
        //rules stores the set of rules for handling modules
        rules: [
            {
                //test is the file extension we're looking for
                test: /\.jsx?/,
                //exclude are the files we want to ignore and not bundle
                exclude: /(node_modules)/,
                //use is where we store the loaders and their optional presets
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