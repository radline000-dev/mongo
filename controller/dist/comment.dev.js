"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ErrorResponse = require("../utils/errorResponse");

var asyncHandler = require("../middleware/async"); // Working Base Comment CRUD Contoller

/** Comment Model Import */


var _require = require("../models/Comment"),
    Comment = _require.Comment;

var Blog = require("../models/Blog");

var User = require("../models/User"); // 기능 구현
// @desc    댓글 전체 조회
// @route   GET /blog/comment
// @access  Public


exports.getAllComments = asyncHandler(function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc    특정 블로그에 댓글 리스트
// @route   GET /blog/:blog_id/comment
// @access  Public

exports.getComments = asyncHandler(function _callee2(req, res, next) {
  var _req$query$page, page, blog_id, blog, comments;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //pagenation
          _req$query$page = req.query.page, page = _req$query$page === void 0 ? 0 : _req$query$page;
          page = parseInt(page);
          blog_id = req.params.blog_id;
          _context2.next = 5;
          return regeneratorRuntime.awrap(Blog.findById(blog_id));

        case 5:
          blog = _context2.sent;

          if (blog) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("".concat(blog_id, " is Not Blog data")), 404));

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(Comment.find({
            blog: blog
          }).sort({
            createdAt: -1
          }).skip(page * 3).limit(3));

        case 10:
          comments = _context2.sent;

          if (comments) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("Comment not Found"), 500));

        case 13:
          res.status(200).json({
            success: true,
            comments: comments
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc    특정 블로그의 한개의 댓글 조회
// @route   GET /blog/:blog_id/comment/:comment_id
// @access  Public

exports.getComment = asyncHandler(function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc    댓글 생성
// @route   POST /blog/:blog_id/comment
// @access  Public

exports.postComment = asyncHandler(function _callee4(req, res, next) {
  var blog_id, _req$body, content, userId, _ref, _ref2, blog, user, comment;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          blog_id = req.params.blog_id;
          _req$body = req.body, content = _req$body.content, userId = _req$body.userId;

          if (userId) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("userId is required"), 400));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(Promise.all([Blog.findOne({
            _id: blog_id,
            isLive: true
          }), User.findById(userId)]));

        case 6:
          _ref = _context4.sent;
          _ref2 = _slicedToArray(_ref, 2);
          blog = _ref2[0];
          user = _ref2[1];

          if (!(!blog || !user)) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("".concat(blog_id, " and ").concat(userId, " is Not Blog data, add Blog is Live true?")), 404));

        case 12:
          if (!(typeof content !== "string")) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("content must be String"), 400));

        case 14:
          comment = new Comment({
            content: content,
            user: user,
            userFullName: "".concat(user.name.first, " ").concat(user.name.last),
            blog: blog
          }); // [comment, blog] = await Promise.all([
          //   comment.save(),
          //   Blog.updateOne({ _id: blog_id }, { $push: { comments: comment } }),
          // ]);

          blog.commentsCount++;
          blog.comments.push(comment);
          if (blog.commentsCount > 3) blog.comments.shift();
          _context4.next = 20;
          return regeneratorRuntime.awrap(Promise.all([comment.save(), blog.save() // Blog.updateOne({ _id: blog_id }, { $inc: { commentsCount: 1 } }),
          ]));

        case 20:
          res.status(200).json({
            success: true,
            comment: comment
          });

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc    댓글 갱신
// @route   put /blog/:blog_id/comment/:comment_id
// @access  Private

exports.updateComment = asyncHandler(function _callee5(req, res, next) {
  var comment_id, content, _ref3, _ref4, comments;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          comment_id = req.params.comment_id;
          content = req.body.content;

          if (!(typeof content !== "string")) {
            _context5.next = 4;
            break;
          }

          return _context5.abrupt("return", next(new ErrorResponse("content must be String"), 400));

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(Promise.all([Comment.findOneAndUpdate({
            _id: comment_id
          }, {
            content: content
          }, {
            "new": true
          }), Blog.updateOne({
            "comments._id": comment_id
          }, {
            "comments.$.content": content
          })]));

        case 6:
          _ref3 = _context5.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          comments = _ref4[0];
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            comments: comments
          }));

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // @desc    댓글 삭제
// @route   delete /blog/:blog_id/comment/:comment_id
// @access  private

exports.deleteUser = asyncHandler(function _callee6(req, res, next) {
  var comment_id, comment;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          comment_id = req.params.comment_id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Comment.findOneAndDelete({
            _id: comment_id
          }));

        case 3:
          comment = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(Blog.updateOne({
            "comment._id": comment_id
          }, {
            $pull: {
              comments: {
                _id: comment_id
              }
            }
          }));

        case 6:
          res.status(204).json({
            success: true
          });

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
});