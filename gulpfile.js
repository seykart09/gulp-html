// Require the modules.
var gulp = require("gulp");
var gutil = require("gulp-util");
var argv = require("minimist")(process.argv.slice(2));
var nunjucksRender = require("gulp-nunjucks-render");
var del = require("del");
const newer = require("gulp-newer");
const imagemin = require("gulp-imagemin");


// var minimist = require('minimist');
var config = require("./config.json");

// var options = minimist(process.argv.slice(2));

// global.myLayout = options.Layout;
global.config = config;
// global.pugSrc = ['*.pug', '!**/template.pug'];
global.pugSrc = ["*.njk", "!**/template.pug"];

gutil.log(gutil.colors.green("Starting Gulp!!"));

const autoPrefixTasks = require("./gulp-tasks/autoprefix")(gulp);
const beautifyTasks = require("./gulp-tasks/beautify")(gulp);
const cleanTasks = require("./gulp-tasks/clean")(gulp);
const copyTask = require("./gulp-tasks/copy")(gulp);
const cssTasks = require("./gulp-tasks/css")(gulp);
const pugTasks = require("./gulp-tasks/pug")(gulp);
const replaceTasks = require("./gulp-tasks/replace")(gulp);
const scssTasks = require("./gulp-tasks/scss")(gulp);
const imageTasks = require("./gulp-tasks/images")(gulp);
const uglifyTasks = require("./gulp-tasks/uglify")(gulp);

// Clean assets
const clean = function () {
  return del(["./assets"]);
};

// Clean CSS & JS
// const clean = gulp.series(cleanTasks.css, cleanTasks.js, cleanTasks.html);

// Create CSS from SCSS
const dist_css = gulp.series(
  scssTasks.pages,
  autoPrefixTasks.css,
  cssTasks.css_comb,
  cssTasks.css_min
);

// Dist JS
const scripts = gulp.series(copyTask.js, uglifyTasks.js);

// Dist HTML

const html = function () {
  var baseUrl = argv.production ? config.productionUrl : "..";
  var starterUrl = argv.production ? config.productionUrl : "../..";

  return gulp
    .src("./src/njk/pages/**/*.+(html|njk)")
    .pipe(
      nunjucksRender({
        manageEnv: function (environment) {
          environment.addGlobal("baseUrl", baseUrl);
          environment.addGlobal("starterUrl", starterUrl);
        },
        path: ["src/njk"],
      })
    )
    .pipe(gulp.dest("./html/"));
};

const images = function () {
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

// Dist Images

// Monitor Changes
// const watch = gulp.series(gulp.parallel(pugTasks.watch, scssTasks.watch));

const watchFiles = function () {
  gulp.watch(config.source.sass + "/**/*.scss", dist_css);
  gulp.watch("./src/njk/**/*.+(html|njk)", html);
  gulp.watch(config.source.images + "/**/*", images);
  gulp.watch(config.source.js + "/**/*.js", scripts);
}

// Beautify HTML
const beautifyHtml = gulp.series(beautifyTasks.html);

// Replacement Tasks
const replacement = gulp.series(replaceTasks.css, replaceTasks.js);

// Default / Basic tasks
const watch = gulp.parallel(watchFiles);
const build = gulp.series(
  clean,
  gulp.parallel(
    dist_css,
    scripts,
    html,
    images
  )
);

exports.default = watch;
exports.build = build;
exports.watch = watch;
