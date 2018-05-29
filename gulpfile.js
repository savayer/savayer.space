var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	babel = require('gulp-babel');

gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	})
})

gulp.task('convertCss', function() {
    gulp.src('src/scss/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload())
	gulp.src('dist/css/styles.css')
    	.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css/min'))
		.pipe(connect.reload())
});

gulp.task('babel', function() {
    gulp.src('src/babel/main.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload())
});

gulp.task('html', function() {
	gulp.src('dist/index.html')
		.pipe(connect.reload())
});

gulp.task('default', ['watch', 'convertCss', 'html', 'connect', 'babel']);

gulp.task('watch', function() {
	gulp.watch('src/scss/styles.scss', ['convertCss']);
	gulp.watch('dist/index.html', ['html']);
	gulp.watch('src/babel/main.js', ['babel']);
});