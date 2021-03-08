const express = require("express");
const Router = express.Router();

// Clear Blog Router
const {
  postBlog,
  getBlogs,
  getBlog,
  putBlog,
  patchBlog,
  deleteBlog,
} = require("../controller/blog");

// todo Add working
const comment = require("../routes/comment");

//오는 경로에 맟춰 보내 버려랴~
Router.use("/:blog_id/comment", comment);

Router.route("/").post(postBlog).get(getBlogs);

//put 전체적인 수정
//patch 부분적인 수정

Router.route("/:blog_id")
  .get(getBlog)
  .put(putBlog)
  .delete(deleteBlog)
  .patch(patchBlog);

module.exports = Router;
