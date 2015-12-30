// npm module imports

import gulp from 'gulp';

import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import minify from 'gulp-minify-css';
import uglify from 'gulp-uglify';

import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';

// project specific variables

const paths = {
	'vendor': [
		{
			'entry': './bower_components/normalize-scss/_normalize.scss',
			'dest': './styles/scss/vendor'
		}
	],
	'styles': {
		'entry': './styles/scss/style.scss',
		'dest': './styles/dist',
	},
	'scripts': {
		'entry': './scripts/app/app.js',
		'dest': './scripts/dist',
	},
};

const bundler = watchify(browserify('./src/js/app.js', args)).transform(babelify);

// VENDOR Task ================================
// - handler to deal with third party libs (bower components, in this case)

gulp.task('vendor', () => {
	paths.vendor.forEach((module) => {
		// copy each lib to it's destination in the project
		gulp.src(module.entry)
			.pipe(gulp.dest(module.dest));
	});
});

// STYLES Task ================================
// - scss/css specific handlers

gulp.task('styles', () => {
	gulp.src(paths.styles.entry)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(minify())
		.pipe(sourcemaps.write('../src'))
		.pipe(gulp.dest(paths.styles.dest));
});

// SCRIPTS Task ================================
// - js files specific handlers

gulp.task('scripts', () => {

});

// WATCH Task ==================================
// - set listeners to .scss and .js files 

gulp.task('watch', () => {
	gulp.watch('./styles/scss/**/*.scss', ['styles']);
});

// DEFAULT Task =================================
// - define the task run order when gulp command is called

gulp.task('default', [
	'vendor',
	'styles',
	'scripts',
	'watch'
]);