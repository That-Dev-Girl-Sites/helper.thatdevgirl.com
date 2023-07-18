/**
 * Build tasks.
 */

const gulp       = require( 'gulp' ),
      browserify = require( 'browserify' ),
      buffer     = require( 'vinyl-buffer' ),
      sass       = require( 'gulp-dart-sass' ),
      source     = require( 'vinyl-source-stream' ),
      uglify     = require( 'gulp-uglify' );


// SCSS.
gulp.task( 'scss', function() {
  return gulp.src( 'source/sass/styles.scss' )
    .pipe( sass( { outputStyle: 'compressed' } ) )
    .pipe( gulp.dest( 'build' ) );
});

// JS.
gulp.task( 'js', function() {
  return browserify( { entries: [
    'source/js/scripts.js'
  ] } )
    .transform( 'babelify', { presets: [ '@babel/preset-env' ] } )
    .bundle()
    .pipe( source( 'scripts.min.js' ) )
    .pipe( buffer() )
    .pipe( uglify() )
    .pipe( gulp.dest( './build' ) );
});


gulp.task( 'default', gulp.series( 'scss', 'js' ) );