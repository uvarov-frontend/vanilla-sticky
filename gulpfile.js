const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const del = require('del');
const FtpDeploy = require('ftp-deploy');

const ftp = require('./.ftp');

const paths = {
	src: 'src/*.*',
	dest: 'dest/',
	build: 'build/',
	npm: 'src/npm/**/*',
	fonts: {
		src: 'src/fonts/**/*.{woff,woff2}',
		dest: 'dest/fonts/',
	},
	img: {
		src: 'src/img/**/*.{png,jpg,jpeg,svg}',
		dest: 'dest/img/',
	},
	js: {
		watch: 'src/js/**/*.js',
		src: ['src/js/**/*.js', '!src/js/other/**/*.js'],
		dest: 'dest/js/',
	},
	styles: {
		watch: 'src/styles/**/*.scss',
		src: ['src/styles/**/*.scss', '!src/styles/other/**/*.scss'],
		dest: 'dest/css/',
	},
};

function reload(done) {
	browserSync.reload();
	done();
}

function server(done) {
	browserSync.init({
		notify: false,
		ui: false,
		reloadDebounce: 1000,
		server: {
			baseDir: paths.dest,
		},
		snippetOptions: {
			rule: {
				match: /<head>/i,
				fn(snippet, match) {
					const {
						groups: { src },
					} = /src='(?<src>[^']+)'/u.exec(snippet);
					return `<script src="${src}" async></script>${match}`;
				},
			},
		},
	});
	done();
}

function deploy() {
	return new FtpDeploy().deploy({
		user: ftp.user,
		password: ftp.password,
		host: ftp.host,
		port: ftp.port,
		remoteRoot: ftp.root,
		localRoot: paths.dest,
		include: ['.*', '*', '**/*'],
		exclude: ['.DS_Store'],
		deleteRemote: true,
		forcePasv: true,
		sftp: false,
	});
}

// Tasks

function clean() {
	return del(['dest']);
}

function cleanBuild() {
	return del(['build']);
}

function files() {
	return gulp.src(paths.src)
		.pipe(gulp.dest(paths.dest));
}

function fonts() {
	return gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
}

function img() {
	return gulp.src(paths.img.src)
		.pipe(gulp.dest(paths.img.dest));
}

function js() {
	return gulp.src(paths.js.src)
		.pipe(babel())
		.pipe(gulp.dest(paths.js.dest));
}

function jsMinify() {
	return gulp.src(paths.js.src)
		.pipe(babel())
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest(paths.js.dest));
}

function styles() {
	return gulp.src(paths.styles.src)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(gulp.dest(paths.styles.dest));
}

function stylesMinify() {
	return gulp.src(paths.styles.src)
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest(paths.styles.dest));
}

function npm() {
	return gulp.src(paths.npm)
		.pipe(gulp.dest(paths.build));
}

function copy() {
	return gulp.src(['dest/js/modules/*.js', 'dest/css/modules/*.css'])
		.pipe(gulp.dest(paths.build));
}

function watch() {
	gulp.watch(paths.src, gulp.series(files, reload));
	gulp.watch(paths.js.watch, gulp.series(gulp.parallel(js, jsMinify), reload));
	gulp.watch(paths.styles.watch, gulp.series(gulp.parallel(styles, stylesMinify), reload));
}

const dest = gulp.series(clean, gulp.parallel(files, fonts, img), gulp.parallel(js, jsMinify), gulp.parallel(styles, stylesMinify));
const build = gulp.series(cleanBuild, dest, npm, copy);
const start = gulp.series(dest, gulp.parallel(server, watch));

exports.clean = clean;
exports.dest = dest;
exports.build = build;
exports.start = start;
exports.watch = watch;
exports.server = server;
exports.ftp = deploy;

exports.default = build;
