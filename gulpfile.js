// Подключаем Gulp
var gulp = require("gulp");

// Подключаем плагины Gulp
var sass = require("gulp-sass"), // переводит SASS в CSS
    cssnano = require("gulp-cssnano"), // Минимизация CSS
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    imagemin = require('gulp-imagemin'), // Сжатие изображение
    concat = require("gulp-concat"), // Объединение файлов - конкатенация
    uglify = require("gulp-uglify"), // Минимизация javascript
    rename = require("gulp-rename"); // Переименование файлов

/* --------------------------------------------------------
   ----------------- Таски ---------------------------
------------------------------------------------------------ */

// Копирование файлов HTML в папку dist
gulp.task("html", function() {
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"));
});

// Объединение, компиляция Sass в CSS, простановка венд. префиксов и дальнейшая минимизация кода
gulp.task("sass", function() {
    return gulp.src(["src/sass/*.sass","src/sass/*.scss"])
        // .pipe(concat(['styles.sass', 'styles.scss']))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
         }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"));
});

// Объединение и сжатие JS-файлов
gulp.task("scripts", function() {
    return gulp.src("src/js/*.js") // директория откуда брать исходники
        .pipe(concat('scripts.js')) // объеденим все js-файлы в один 
        // .pipe(uglify()) // вызов плагина uglify - сжатие кода
        .pipe(rename({ suffix: '.min' })) // вызов плагина rename - переименование файла с приставкой .min
        .pipe(gulp.dest("dist/js")); // директория продакшена, т.е. куда сложить готовый файл
});

// Сжимаем картинки
gulp.task('img', function() {
    return gulp.src("src/image/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/image"))
});

// Задача слежения за измененными файлами
gulp.task("watch", function() {
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch(["src/sass/*.sass", "src/sass/*.scss"], ["sass"]);
    gulp.watch("src/image/*.+(jpg|jpeg|png|gif)", ["img"]);
});

///// Таски ///////////////////////////////////////

// Запуск тасков по умолчанию
gulp.task("default", ["html", "sass", "scripts", "img", "watch"]);