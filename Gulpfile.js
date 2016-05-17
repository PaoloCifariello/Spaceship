var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var tsServer = ts.createProject(path.resolve('./server/tsconfig.json'));
var tsClient = ts.createProject(path.resolve('./client/tsconfig.json'));


gulp.task('build', ["build_server", "build_client"]);

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
		.pipe(sourcemaps.init())
		.pipe(ts(tsClient));
		
	return tsResult.js
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(path.resolve('./client')));
});