const express = require("express");
const Router = express.Router();

// Clear User CRUD Router
// 기능 가져오기
const {
  getUsers,
  postUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controller/user");
// 모델 가져오기
const User = require("../models/User");

// 경로 설정
Router.route("/").get(getUsers).post(postUser);

Router.route("/:user_id").get(getUser).delete(deleteUser).put(updateUser);
// 라우터 내보내기
module.exports = Router;
