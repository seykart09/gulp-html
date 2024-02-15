const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");

module.exports = (gulp, callback) => {
  const imageTask = function () {
    return gulp
      .src(config.source.images + "/**/*")
      .pipe(newer(config.destination.images))
      .pipe(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: false,
                collapseGroups: true,
              },
              {
                removeUnknownsAndDefaults: false,
              },
              { cleanupIDs: false },
            ],
          }),
        ])
      )
      .pipe(gulp.dest(config.destination.images  + '/'));
  };
  // ---------------------------------------------------------------------------
  // Exports

  return {
    images: imageTask,
  };
};
