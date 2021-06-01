"use strict";
const pug = require("pug");
const util = require("./handler-util");
const Post = require("./post");
const Cookies = require("cookies");

const trackingIdKey = "tracking_id";

function handle(req, res) {
  const cookies = new Cookies(req, res);
  addTrackingCookie(cookies);

  switch (req.method) {
    case "GET":
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      Post.findAll().then((posts) => {
        res.end(pug.renderFile("./views/posts.pug", { posts, user: req.user }));
        console.info(
          `閲覧されました: user: ${req.user}, ` +
            `trackingId: ${cookies.get(trackingIdKey)},` +
            `remoteAddress: ${req.socket.remoteAddress} ` +
            `user-agent: ${req.headers["user-agent"]}`
        );
      });
      break;
    case "POST":
      // POSTの処理
      let body = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          const decoded = decodeURIComponent(body);
          const params = new URLSearchParams(decoded);
          const content = params.get("content");
          console.log("[" + new Date() + "]" + "Post saved: " + content);

          Post.create({
            content,
            trackingCookie: cookies.get(trackingIdKey),
            postedBy: req.user,
          }).then(() => {
            handleRedirectPosts(req, res);
          });
        });
      break;
    case "PUT":
      util.handleBadRequest(req, res);
      break;
    default:
      break;
  }
}

function addTrackingCookie(cookies) {
  if (!cookies.get(trackingIdKey)) {
    const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const tomorrow = new Date(Date.now() + 1000 * 60 * 60 * 24);
    cookies.set(trackingIdKey, trackingId, { expires: tomorrow });
  }
}

function handleRedirectPosts(req, res) {
  // 今回はステータスコードとして以前使用した 302 - Found ではなく、 303 - See Other を利用しています。
  // 303 は POST でアクセスした際に、その処理の終了後、 GET でも同じパスにアクセスし直してほしい時に利用するステータスコードです。
  res.writeHead(303, {
    Location: "/posts",
  });
  res.end();
}

function handleDelete(req, res) {
  console.log("handleDelete is called");
  switch (req.method) {
    case "POST":
      let body = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          const decoded = decodeURIComponent(body);
          const params = new URLSearchParams(decoded);
          const id = params.get("id");
          Post.findByPk(id).then((post) => {
            // console.info("posted by: " + post.postedBy);
            if (req.user === post.postedBy) {
              post.destroy().then(() => {
                handleRedirectPosts(req, res);
              });
            }
          });
        });
      break;
    default:
      util.handleBadRequest(req, res);
      break;
  }
}

module.exports = {
  handle,
  handleDelete,
};
