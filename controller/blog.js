const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// Clear Blog Base CRUD Controller

/** Model Import */

const Blog = require("../models/Blog");
const User = require("../models/User");

const { Comment } = require("../models/Comment");
// @desc    블로그 전체 조회
// @route   GET /blog
// @access  Public
exports.getBlogs = asyncHandler(async (req, res, next) => {
  let { page } = req.query;
  page = parseInt(page);

  const blogs = await Blog.find()
    .sort({ updatedAt: 1 })
    .skip(page * 3)
    .limit(3);
  if (!blogs || blogs.length == 0)
    return next(new ErrorResponse("Blog Data is Not Found ", 404));

  res.status(200).json({
    success: true,
    blogs: blogs,
  });
});

// @desc    블로그 개인 조회
// @route   GET /blog/:blog_id
// @access  Public
exports.getBlog = asyncHandler(async (req, res, next) => {
  const { blog_id } = req.params;
  if (!blog_id) {
    new ErrorResponse("blog Id must be required ", 400);
  }

  const blog = await Blog.findById(blog_id);
  // const commnetCount = await Comment.find({ blog: blog_id }).countDocuments();
  if (!blog) return next(new ErrorResponse("Blog Data is Not Found ", 404));

  res.status(200).json({
    success: true,
    blog: blog,
  });
});
// @desc    블로그 생성
// @route   Post /blog
// @access  Private / Admin
exports.postBlog = asyncHandler(async (req, res, next) => {
  const { title, content, isLive, userId } = req.body;
  if (typeof title !== "string") {
    return next(
      new ErrorResponse("title is required and title must be String ", 400)
    );
  }
  if (typeof content !== "string") {
    return next(
      new ErrorResponse("content is required and content must be String ", 400)
    );
  }
  if (typeof isLive !== "boolean") {
    return next(
      new ErrorResponse("isLive is required and isLive must be Boolean ", 400)
    );
  }
  let user = await User.findById(userId);
  if (!user)
    return next(new ErrorResponse(`${userId} is User Data Not Found`, 404));

  const BlogData = {
    ...req.body,
    user,
  };

  const blog = await Blog.create(BlogData);
  res.status(201).json({
    success: true,
    blog: blog,
  });
});
// @desc    블로그 전체 갱신
// @route   Put /blog/:blog_id
// @access  Private / Admin
exports.putBlog = asyncHandler(async (req, res, next) => {
  const { blog_id } = req.params;
  const { title, content } = req.body;
  if (!blog_id) {
    new ErrorResponse("blog Id must be required ", 400);
  }

  if (typeof title !== "string") {
    return next(
      new ErrorResponse("title is required and title must be String ", 400)
    );
  }
  if (typeof content !== "string") {
    return next(
      new ErrorResponse("content is required and content must be String ", 400)
    );
  }

  const blog = await Blog.findByIdAndUpdate(
    blog_id,
    { content, title },
    { new: true }
  );

  if (!blog) {
    return next(new ErrorResponse(`${blog_id} Can not  update`, 500));
  }
  res.status(200).json({
    success: true,
    blog,
  });
});

// @desc    블로그 부분 갱신
// @route   Patch /blog/:blog_id
// @access  Private / Admin
exports.patchBlog = asyncHandler(async (req, res, next) => {
  const { blog_id } = req.params;
  const { isLive } = req.body;
  if (!blog_id) {
    new ErrorResponse("blog Id must be required ", 400);
  }

  if (typeof isLive !== "boolean") {
    return next(new ErrorResponse("isLive is required must be Boolean ", 400));
  }

  const blog = await Blog.findByIdAndUpdate(blog_id, { isLive }, { new: true });

  if (!blog) {
    return next(new ErrorResponse(`${blog_id} Can not  update`, 500));
  }
  res.status(200).json({
    success: true,
    blog,
  });
});
// @desc    블로그 삭제
// @route   delete /blog/:blog_id
// @access  Private / Admin
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  const { blog_id } = req.params;
  if (!blog_id) {
    new ErrorResponse("blog Id must be required ", 400);
  }

  await Blog.findByIdAndDelete(blog_id);

  res.status(200).json({
    success: true,
    blog,
  });
});
