var gulp = require('gulp'),
    nodemon = require('gulp-nodemon')


gulp.task('start', function() {
    nodemon({
        script: 'server.js',
        ext: 'js jade',
        env: {
            'NODE_ENV': 'development'
        }
    })
})

gulp.task('default', ['start']);
