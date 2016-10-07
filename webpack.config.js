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
        publicPath: "/js/",
        filename: "bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    plugins: [
      //new webpack.optimize.CommonsChunkPlugin('phaser', 'phaser.js'),
      new webpack.ProvidePlugin({
          PIXI: pixi,
          Phaser: phaser,
          p2: p2
      })
    ]
 };