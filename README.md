# Comments project on AngularJS

This is my comments project. Core files what's u must use for see how it's work in `dist/`.

## Getting Started

* For This project i'm using: 

```
-AngularJS - v1.6.9
-Bootstrap - v4
-Gulp(sass and others plugins)
-HTML5
-CSS3
-FontAwesome
```
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For using this project You need instal Node.js, AngularJS, Gulp, SaSS.

```
npm install -g
```

### Installing

Step 1 - Installing node.js

```
Going to https://nodejs.org/en/

- and downloading a current version Node.js
```

Step 2 - instal gulp in your pc in console/terminal

```
npm i gulp-cli -g
```

Step 3 - Install your gulp in project (in your directory)

```
npm i gulp --save-dev 
```

Step 4 - install in your project SASS

```
npm i gulp-sass --save-dev
```

Step 5 - init your project

```
npm init
```
Then You must writing a same data about your project in terminal/console

Step 6 - creat a `gulpfile.js` near `package.json`


Now you have all to create your project! After configurate your gulpfile.js (See how to do it in `https://www.npmjs.com/package/gulp-install` for-local-use-with-gulp) You can use your last command `gulp` and work.


### That is my configurate gulpfile.js



```
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
```

## Other about my settings GULP

How u can see - i have more then gulp and sass:

```
--cssnano - minificate your css file
--autoprefixer - set prefix `.min` or else to your filename
--imagemin - minificate your images
--concat - concat your files
--uglify - minificate your js files
--rename - rename your files
--sass - for compile your SASS to CSS
```

## Versioning
```
AngularJS - v1.6.9
Bootstrap - 4
Font-awesome - latest
Node.js - latest
Gulp - latest
```
## Authors

* **Pavel Konchych** - *SelfDevelopment* - [paveligorevich55](https://github.com/paveligorevich55)

## License

None


## Structure
	
##### In this project i'll use GULP structure files

```
  |- src/
      |- css/
      |- fonts/
      |- image/ 
      |- index.html
      |- js/ 
      |- sass/
  |- dist/
      |- css/
      |- fonts/
      |- image/ 
      |- index.html
      |- js/ 
  |- gulpfile.js
  |- node_modules/
  |- package.json
  |- psd/
```
```
src - it's working directory
dist - it's prodaction version with app core (for using and testing).
```

###### Header
![](http://i.piccy.info/i9/b01d85c75a1f13169eee797689685edb/1537187666/228445/1268617/Snymok_ekrana_2018_09_17_v_15_22_09.jpg)
###### Post New Comment
![](http://i.piccy.info/i9/76c1bf7b0ef6f9335632c34ef472c65f/1537187574/143041/1268617/Snymok_ekrana_2018_09_17_v_15_22_24.png)
###### Edit comment
![](http://i.piccy.info/i9/b63c367d21da754e3e4eba9ef8ee5cd3/1537187609/97050/1268617/Snymok_ekrana_2018_09_17_v_15_22_50.png)
###### Reply for a comment
![](http://i.piccy.info/i9/95e38c5146b3b2cfc6a08e8c72153bce/1537187638/95507/1268617/Snymok_ekrana_2018_09_17_v_15_23_01.png)






