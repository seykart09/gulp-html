var watch = require('gulp-watch');

module.exports = (gulp, callback) => {

  

  const pugWatchTask = function () {
    var baseUrl = argv.production ? config.productionUrl : "..";
    var starterUrl = argv.production ? config.productionUrl : "../..";
    
    return watch("./src/njk/pages/**/*.+(html|njk)")
      .pipe(
        nunjucksRender({
          manageEnv: function (environment) {
            environment.addGlobal("baseUrl", baseUrl);
            environment.addGlobal("starterUrl", starterUrl);
          },
          path: ["src/njk"],
        })
      )
      .pipe(gulp.dest("./html"));
  };

  // ---------------------------------------------------------------------------
  // Exports

  return {
    watch: pugWatchTask
  };
};
