var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var open = require('gulp-open');
var del = require('del');
var runSequence = require('run-sequence');

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Production build
gulp.task('build', function(callback) {
    runSequence('clean-build',
              ["webpack:build", 'files:build'],
              callback);
});

gulp.task('clean-build', function() {
    return del(['build']);
});

gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('files:build', function() {
  return gulp.src(['src/**', '!src/ts', '!src/ts/**'])
    .pipe(gulp.dest('build'));
});

// create a single instance of the compiler to allow caching
//var devCompiler = webpack(webpackConfig);

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.devServer = {
		noInfo: true,
    hot: true,
    inline: true
	}
	myConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
	//myConfig.debug = true;
	myConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", 'webpack/hot/dev-server');

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
    contentBase: "./src/",
    publicPath: "/" + myConfig.output.publicPath,
		hot: true,
		inline: true,
		clientLogLevel: "none",
    stats: {
			colors: true
		}
    
  }).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/");
    gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:8080/'}));
	});
});
