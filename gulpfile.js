var gulp = require("gulp");
var ghPages = require("gulp-gh-pages");

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe(ghPages());
});

gulp.task("build", function () {
  return gulp.src("./src/index.html").pipe(gulp.dest("./dist/"));
});
