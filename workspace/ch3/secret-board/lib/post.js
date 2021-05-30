"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:postgres@db/secret_board",
  {
    logging: false,
  }
);

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // データを入れる際に自動で1増加してくれる
      primaryKey: true, // 固有であるかのチェック
    },
    content: {
      type: DataTypes.TEXT,
    },
    postedBy: {
      type: DataTypes.STRING,
    },
    trackingCookie: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Post.sync();
module.exports = Post;
