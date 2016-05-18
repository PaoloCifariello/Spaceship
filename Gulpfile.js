var path = require('path'),
	gulp = require('gulp'),
	ts = require('gulp-typescript'),
	concat = require('gulp-concat'),
 	source = require('vinyl-source-stream'),
	sourcemaps = require('gulp-sourcemaps'),
	webpack = require('webpack-stream');

var tsServer = ts.createProject(path.resolve('./server/tsconfig.json'));
var tsClient = ts.createProject(path.resolve('./client/tsconfig.json'));

var sourceFile = "./client/main.js",
	destFile = "main.js",
	destFolder = './client/';

gulp.task('build', ["build_server", "webpack"]);

gulp.task('build_server', function () {
	var tsResult = tsServer
	  	.src()
		.pipe(sourcemaps.init())
		.pipe(ts(tsServer));
	
	return tsResult.js
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(path.resolve('./server')));
});


gulp.task('build_client', function () {
	var tsResult = tsClient
	  	.src()
		.pipe(ts(tsClient));
		
	return tsResult.js
		.pipe(gulp.dest(path.resolve('./client')));
});

gulp.task('webpack', ['build_client'], function() {
	return gulp.src('./client/main.js')
    	.pipe(webpack({
			output: {
        		filename: 'main.js',
      		}
		})).pipe(gulp.dest('./client/script'));
}) 