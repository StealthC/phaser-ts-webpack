var path = require("path");
var webpack = require('webpack');

var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

 module.exports = {
    entry: {
        app: ["./src/ts/index.ts"]
        //phaser: [pixi, phaser, p2]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "",
        filename: "js/bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: {
            'phaser': phaser,
            'pixi.js': pixi,
            'p2': p2,
        }
    },
    module: {
        loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    plugins: [
      new webpack.ProvidePlugin({
          PIXI: 'pixi.js',
          Phaser: 'phaser',
          p2: 'p2'
      })
    ]
 };