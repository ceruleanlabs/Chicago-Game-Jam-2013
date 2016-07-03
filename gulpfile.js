var del = require("del");
var gulp = require("gulp");
var ghPages = require("gulp-gh-pages");
var nodemon = require("gulp-nodemon");

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

gulp.task("server", ["build"], function (cb) {
  nodemon({ script: "server.js" });
});
