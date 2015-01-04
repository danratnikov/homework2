'use strict';

var gulp = require('gulp'),
	prettify = require('gulp-html-prettify'),
	notify = require('gulp-notify'),
	jade = require('gulp-jade'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	opn = require('opn'),
	stylus = require('gulp-stylus'),
	del = require('del');

var	serverPort = 8080;

// Server
gulp.task('connect', function(){
	connect.server({
		root: 'app',
		port: serverPort,
		livereload: true
	});
	
	opn('http://localhost:' + serverPort);

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
	gulp.src('app/stylus/main.styl')            // берем main.styl
		.pipe(stylus())							// компилируем его
		.pipe(gulp.dest('app/css/'))			// в папку app/css/
		.pipe(notify("Stylus complete!"))		// показываем уведомление
		.pipe(connect.reload());				// перезагружаем страницу
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
gulp.task('clean', function(path){
	del(path + "*.*");
});

// Task default
gulp.task('default', ['connect', 'jade', 'stylus', 'watch']);