var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
var session = require("express-session");
var passport = require("passport");
var GitHubStrategy = require("passport-github2").Strategy;

var GITHUB_CLIENT_ID = "84272442c6bafb2f80d3";
var GITHUB_CLIENT_SECRET = "96eda3180ccd7955f001c7881cccec7658a3e806";

// 認証されたユーザーの情報をどのようにセッションに保存し、読み出すかという処理を記述
passport.serializeUser(function (user, done) {
  // 第一引数がエラー、第二引数が結果
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
// serialize, deserializeはメモリ上に参照として散ったデータをバイナリとして保存できる
// 形式に変換したり元に戻したりすること

// GitHubを利用した認証の戦略オブジェクト
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // 認証後に実行する処理
      // キーワード：イベントループ、非同期IO
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var photosRouter = require("./routes/photos");

var app = express();
app.use(helmet());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// パスに対するHTTPリクエストのハンドラの登録
app.use(
  session({
    secret: "496f762d0a0e6797", // 自分用に生成したランダムな文字列
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/photos", photosRouter);

app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }), // 認可される権限の範囲
  function (req, res) {}
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  // 認証が失敗した際はloginにリダイレクト
  function (req, res) {
    res.redirect("/");
  }
);

// loginでGETがあったときにロクインページを描画
app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
