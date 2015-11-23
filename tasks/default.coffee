gulp = require 'gulp'
concat = require 'gulp-concat'

gulp.task 'buildScripts', ->
	gulp.src('./src/**/*.js')
		.pipe(concat 'jscommons.js')
		.pipe(gulp.dest 'build')
		
gulp.task 'default', ['buildScripts']