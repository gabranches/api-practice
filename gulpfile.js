var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-ruby-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload'),
	nodemon = require('gulp-nodemon');	

gulp.task('default', ['watch'], function() {
	nodemon({
		script: 'app.js',
		ext: 'ejs js html'
	}).on('restart', function() {
		gulp.src('app.js')
			.pipe(livereload());
	});
});

gulp.task('build-css', function() {
	return sass('source/scss/*.scss')
		.on('error', sass.logError)
		.pipe(gulp.dest('public/css'))
		.pipe(livereload());
});

gulp.task('build-js', function() {
	return gulp.src('source/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('main.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(livereload());
});

gulp.task('copy-html', function() {
	return gulp.src('source/templates/*.html')
		.pipe(gulp.dest('public/templates'))
		.pipe(livereload());
})

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('source/scss/*.scss', ['build-css']);
	gulp.watch('source/js/*.js', ['build-js']);
	gulp.watch('source/templates/*.html', ['copy-html']);
})