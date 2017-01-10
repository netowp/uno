var gulp = require('gulp');
var sass = require('gulp-ruby-sass')
var notify = require("gulp-notify");
var bower = require('gulp-bower');
var livereload = require('gulp-livereload');

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
})

gulp.task('css', function(){
    return sass(config.sassPath + '/style.scss', {
            style: 'compressed',
            loadPath: [
                './resources/sass',
                config.bowerDir + '/bootstrap-sass/assets/stylesheets'
            ]
        })
        .on("error", notify.onError(function(error) {
            return "Error: " + error.message; 
        }))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload({
            start: true,
            reloadPage: 'index.html'
        }))
});

gulp.task('html', function() {
    return gulp.src('public/**/*.html')
        // .pipe(gulp.dest(''))
        .pipe(livereload())
        // .pipe(notify({ message: 'HTML task complete' }));
});

gulp.task('reload', function() {

})

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([config.sassPath + '/**/*.scss', 'public/**/*.html'], ['css', 'html'])
})

gulp.task('default', ['bower', 'css'])