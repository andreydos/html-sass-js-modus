'use strict';
/*  npm uninstall gulp gulp-rigger browser-sync gulp-watch gulp-autoprefixer gulp-notify gulp-ruby-sass gulp-cssnano gulp-rename imagemin-pngquant --save-dev */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'), 
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    notify = require("gulp-notify"),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    imageminPngquant = require('imagemin-pngquant'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'web/',
        img: 'web/img/',
        js: 'web/js/',
        styles: 'web/css/'  
    },
    src: {
        html: 'src/*.html',
        img: 'src/img/**/*.*',
        js: 'src/js/**/*.*',
        styles: 'src/slytes/main.scss' 
    },
    watch: {
        html: 'src/**/*.html',
        img: 'src/img/**/*.*',
        js: 'src/js/**/*.*',
        styles: 'src/styles/**/*.scss'
    },
    clean: './web'
};

var config = {
    server: {
        baseDir: "./web"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "modus"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('styles:build', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 5 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('web/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)       
        .pipe(imageminPngquant({quality: '65-80', speed: 4})())
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
});

gulp.task('build', [
    'html:build',
    'styles:build',
    'image:build',
    'js:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });  
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:build');
    }); 
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);