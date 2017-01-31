var webpack = require('webpack');
var  BrowserSyncPlugin  =  require('browser-sync-webpack-plugin'); 

module.exports = {
    entry: {
        // './resources/tiled-map-canvas.js': './src-client/tiled-map-canvas.ts',
        './deployment/resources/tiled-map-canvas.js': './deployment/resources/tiled-map-canvas.source.js',
    },
    output: {
        path: './',
        filename: '[name]'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
      ts:  {
        exclude: []
    },
    plugins: [new  BrowserSyncPlugin({  
            host:   'localhost',
                  port:  3000,
                  server:  { 
                baseDir:  ['./resources/'] 
            }    
        })
        // // Uglify
        // , new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     mangle: false,
        //     test: /\.(js|jsx)$/
        // })
        , new webpack.optimize.DedupePlugin()
    ]

};