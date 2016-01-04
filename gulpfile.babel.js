// npm module imports

import gulp from 'gulp';

import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefix from 'gulp-autoprefixer';
import minify from 'gulp-minify-css';
import uglify from 'gulp-uglify';

import rename from 'gulp-rename';
import gutil from 'gulp-util';
import assign from 'lodash.assign';

import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';

import stream from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

// project specific variables

const paths = {
	'vendor': [
		{
			'entry': './bower_components/normalize-scss/_normalize.scss',
			'dest': './styles/scss/vendor'
		},
		{
			'entry': './bower_components/mustache.js/mustache.js',
			'dest': './scripts/vendor'
		}
	],
	'styles': {
		'dir': './styles/scss',
		'entry': './styles/scss/style.scss',
		'dest': './styles/dist'
	},
	'scripts': {
		'dir': './scripts/app',
		'entry': './scripts/app/script.js',
		'dest': './scripts/dist'
	}
};

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
		.pipe(autoprefix())
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write('../srcmaps'))
		.pipe(gulp.dest(paths.styles.dest));
});

// SCRIPTS Task ================================
// - js specific handlers

gulp.task('scripts', () => {
	let bundler = watchify(browserify(assign({}, watchify.args, {
			'entries': ['script.js'],
			'basedir': paths.scripts.dir,
			'debug': true
		}))).transform(babelify),

	   	runBundler = () => {
			bundler.bundle()
			    .on('error', gutil.log.bind(gutil, "Browserify Error"))
			    .pipe(stream(paths.scripts.entry))
			    .pipe(buffer())
			    .pipe(rename('script.min.js'))
			    .pipe(sourcemaps.init({ loadMaps: true }))
			    .pipe(uglify())
			    .pipe(sourcemaps.write('../srcmaps'))
			    .pipe(gulp.dest(paths.scripts.dest));

			return bundler;
		};

	runBundler()
		.on('update', runBundler)
		.on('log', gutil.log);
});

// WATCH Task ==================================
// - set listener to .scss file mods

gulp.task('watch', () => {
	gulp.watch('./styles/scss/**/*.scss', ['styles']);
});

// DEFAULT Task =================================
// - define the task run order when gulp command is called

gulp.task('default', [
	'vendor',
	'scripts',
	'watch'
]);