const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// Working Base Comment CRUD Contoller
/** Comment Model Import */
const { Comment } = require("../models/Comment");
const Blog = require("../models/Blog");
const User = require("../models/User");
<<<<<<< HEAD

=======
const { isValidObjectId, startSession } = require("mongoose");
>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
// 기능 구현

// @desc    댓글 전체 조회
// @route   GET /blog/comment
// @access  Public
exports.getAllComments = asyncHandler(async (req, res, next) => {});

// @desc    특정 블로그에 댓글 리스트
// @route   GET /blog/:blog_id/comment
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
<<<<<<< HEAD
  const { blog_id } = req.params;

  const blog = await Blog.findById(blog_id);
  if (!blog) {
    return next(new ErrorResponse(`${blog_id} is Not Blog data`), 404);
  }
  const comments = await Comment.find({ blog });
=======
  //pagenation
  let { page = 0 } = req.query;
  page = parseInt(page);

  const { blog_id } = req.params;

  const blog = await Blog.findById(blog_id);

  if (!blog) {
    return next(new ErrorResponse(`${blog_id} is Not Blog data`), 404);
  }
  const comments = await Comment.find({ blog })
    .sort({ createdAt: -1 })
    .skip(page * 3)
    .limit(3);

>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
  if (!comments) return next(new ErrorResponse("Comment not Found"), 500);

  res.status(200).json({
    success: true,
    comments,
  });
});

// @desc    특정 블로그의 한개의 댓글 조회
// @route   GET /blog/:blog_id/comment/:comment_id
// @access  Public
exports.getComment = asyncHandler(async (req, res, next) => {});

// @desc    댓글 생성
<<<<<<< HEAD
// @route   POST /blog/:blog_id/comment/:comment_id
// @access  Public
exports.postComment = asyncHandler(async (req, res, next) => {
=======
// @route   POST /blog/:blog_id/comment
// @access  Public
exports.postComment = asyncHandler(async (req, res, next) => {
  // const session = await startSession();
  let comment;
  // try {
  //await session.withTransaction(async () => {
>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
  const { blog_id } = req.params;
  const { content, userId } = req.body;
  if (!userId) {
    return next(new ErrorResponse("userId is required"), 400);
  }
<<<<<<< HEAD

  let [blog, user] = await Promise.all([
    Blog.findOne({ _id: blog_id, isLive: true }),
    User.findById(userId),
=======
  let [blog, user] = await Promise.all([
    Blog.findOne({ _id: blog_id, isLive: true }, {}, {}),
    User.findById(userId, {}, {}),
>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
  ]);

  if (!blog || !user) {
    return next(
      new ErrorResponse(
        `${blog_id} and ${userId} is Not Blog data, add Blog is Live true?`
      ),
      404
    );
  }

  if (typeof content !== "string") {
    return next(new ErrorResponse(`content must be String`), 400);
  }

<<<<<<< HEAD
  let comment = new Comment({
    content,
    blog,
    user,
    userFullName: `${user.name.first} ${user.name.last}`,
  });
  [comment, blog] = await Promise.all([
    comment.save(),
    Blog.updateOne({ _id: blog_id }, { $push: { comments: comment } }),
  ]);

=======
  comment = new Comment({
    content,
    user,
    userFullName: `${user.name.first} ${user.name.last}`,
    blog: blog_id,
  });
  //await session.abortTransaction();
  // [comment, blog] = await Promise.all([
  //   comment.save(),
  //   Blog.updateOne({ _id: blog_id }, { $push: { comments: comment } }),
  // ]);

  // blog.commentsCount++;
  // blog.comments.push(comment);
  // if (blog.commentsCount > 3) blog.comments.shift();

  // await Promise.all([
  //   comment.save({  }),
  //   blog.save(),
  //   // Blog.updateOne({ _id: blog_id }, { $inc: { commentsCount: 1 } }),
  // ]);

  await Promise.all([
    comment.save(),
    Blog.updateOne(
      { _id: blog_id },
      {
        $inc: { commentsCount: 1 },
        $push: { commnets: { $each: [comment], $slice: -3 } },
      }
    ),
  ]);

  // });

>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
  res.status(200).json({
    success: true,
    comment,
  });
<<<<<<< HEAD
=======
  // } catch (next) {
  //   next();
  // } finally {
  //   await session.endSession();
  // }
>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
});
// @desc    댓글 갱신
// @route   put /blog/:blog_id/comment/:comment_id
// @access  Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  const { comment_id } = req.params;
  const { content } = req.body;

  if (typeof content !== "string") {
    return next(new ErrorResponse(`content must be String`), 400);
  }
  const [comments] = await Promise.all([
    Comment.findOneAndUpdate({ _id: comment_id }, { content }, { new: true }),
    Blog.updateOne(
      { "comments._id": comment_id },
      { "comments.$.content": content }
    ),
  ]);
  return res.status(200).json({
    success: true,
    comments,
  });
});

// @desc    댓글 삭제
// @route   delete /blog/:blog_id/comment/:comment_id
// @access  private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { comment_id } = req.params;
  const comment = await Comment.findOneAndDelete({ _id: comment_id });
  await Blog.updateOne(
    { "comment._id": comment_id },
    { $pull: { comments: { _id: comment_id } } }
  );
  res.status(204).json({
    success: true,
  });
});
