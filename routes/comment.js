const express = require("express");
const Router = express.Router({ mergeParams: true });

// Working Commnet Router
const {
  postComment,
  getComments,
  updateComment,
  deleteUser,
} = require("../controller/comment");

Router.route("/").post(postComment).get(getComments);

//put 전체적인 수정
//patch 부분적인 수정

Router.route("/:comment_id")
  .get()
  .put()
  .delete(deleteUser)
  .patch(updateComment);

module.exports = Router;
