var gulp = require("gulp");
var del = require("del");
var ghPages = require("gulp-gh-pages");

gulp.task("deploy", ["build"], function () {
  return gulp.src("./dist/**/*").pipe(ghPages());
});

gulp.task("build", function () {
  var srcPath = "./src/";
  var distPath = "./dist/";
  var filesToCopy = [
    "css/*",
    "images/*",
    "index.html",
    "js/**/*",
    "sounds/*"
  ];

  del(distPath);
  return gulp.src(filesToCopy, { cwd: srcPath + "/**" }).pipe(gulp.dest(distPath));
});
