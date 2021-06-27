"use strict";
const request = require("supertest");
const app = require("../app");
const passportStub = require("passport-stub");

describe("/login", () => {
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ username: "testuser" });
  });

  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  test("Include a link to login", () => {
    return request(app)
      .get("/login")
      .expect("Content-Type", "text/html; charset=utf-8") // レスポンスヘッダの 'Content-Type' が text/html; charset=utf-8 であること
      .expect(/<a href="\/auth\/github"/) // <a href="/auth/github" が HTML に含まれること
      .expect(200); //ステータスコードが 200 OK で返る
  });

  test("ログイン時はユーザー名が表示される", () => {
    return request(app)
      .get("/login")
      .expect(/testuser/)
      .expect(200);
  });
});
