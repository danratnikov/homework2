'use strict';

var gulp = require('gulp'),
	prettify = require('gulp-html-prettify'),
	notify = require('gulp-notify'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	opn = require('opn'),
	stylus = require('gulp-stylus'),
	livereloadPort = 8080,
	del = require('del');

// Server
gulp.task('connect', function(){
	connect.server({
		root: 'app',
		port: livereloadPort,
		livereload: true
	});
	
	opn('http://localhost:' + livereloadPort);

});

// Jade compile
gulp.task('jade', function(){
	gulp.src('app/jade/*.jade')
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('app/'))
		.pipe(notify("Jade complete!"))
		.pipe(connect.reload());
});

// Stylus compile
gulp.task('stylus', function(){
	gulp.src('app/stylus/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('app/css'))
		.pipe(notify("Stylus complete!"))
		.pipe(connect.reload());
});

// Js reload
gulp.task('js', function(){
	gulp.src('app/js/*.js')
		.pipe(connect.reload());
});

// Watching
gulp.task('watch', function(){
	gulp.watch(['app/jade/*.jade', 'app/jade/**/*.jade'], ['jade']);
	gulp.watch('app/stylus/*.styl', ['stylus']);
	gulp.watch('app/js/*.js', ['js']);
});

// Delet files
gulp.task('clean', function(){
	del('node_modules/*.*');
});

// Task default
gulp.task('default', ['connect', 'jade', 'stylus', 'watch']);