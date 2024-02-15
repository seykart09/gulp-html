var clean = require("gulp-clean");

module.exports = (gulp, callback) => {
  const cleanCssTask = function () {
    return gulp
      .src(config.destination.css, {
        read: false,
        allowEmpty: true,
      })
      .pipe(clean());
  };

  const cleanJsTask = function () {
    return gulp
      .src(config.destination.js, {
        read: false,
        allowEmpty: true,
      })
      .pipe(clean());
  };

  const cleanHtmlTask = function () {
    return gulp
      .src(config.destination.html, {
        read: false,
        allowEmpty: true,
      })
      .pipe(clean());
  };
  
  const cleanImageTask = function () {
    return gulp
      .src(config.destination.images, {
        read: false,
        allowEmpty: true,
      })
      .pipe(clean());
  };

  // ---------------------------------------------------------------------------
  // Exports

  return {
    css: cleanCssTask,
    js: cleanJsTask,
    html: cleanHtmlTask,
  };
};
