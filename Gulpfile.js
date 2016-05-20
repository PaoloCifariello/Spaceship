var path = require('path'),
	gulp = require('gulp'),
	ts = require('gulp-typescript'),
	concat = require('gulp-concat'),
 	source = require('vinyl-source-stream'),
	sourcemaps = require('gulp-sourcemaps'),
	webpack = require('webpack-stream'),
	gulpTypings = require("gulp-typings");

var tsServer = ts.createProject(path.resolve('./server/tsconfig.json'));
var tsClient = ts.createProject(path.resolve('./client/tsconfig.json'));

var clientSourceFile = "./client/main.js",
	clientOutputFile = "main.js",
	clientOutputDirectory = './client/script',
	clientTypingsFile = './client/typings.json',
	serverTypingsFile = './server/typings.json';


gulp.task('init', ['init server', 'init client']);

gulp.task('init server', function(){
	var serverTypes = gulp.src(serverTypingsFile)
		.pipe(gulpTypings());
		 
    return serverTypes; // by returning stream gulp can listen to events from the stream and knows when it is finished. 
});

gulp.task('init client', function(){
	var serverTypes = gulp.src(clientTypingsFile)
		.pipe(gulpTypings());
		 
    return serverTypes; // by returning stream gulp can listen to events from the stream and knows when it is finished. 
})

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
	return gulp.src(clientSourceFile)
    	.pipe(webpack({
			output: {
        		filename: clientOutputFile,
      		}
		})).pipe(gulp.dest(clientOutputDirectory));
}) 