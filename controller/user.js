const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// Clear Base User CRUD Contoller
/** User Model Import */
const User = require("../models/User");
const Blog = require("../models/Blog");
const { Comment } = require("../models/Comment");
// 기능 구현

// @desc    유저 전체 조회
// @route   GET /user
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new ErrorResponse(" User Data Not Found !", 404));
  res.status(200).json(users);
});

// @desc    유저 한명 조회
// @route   GET /user/:user_id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  if (!user_id) {
    return next(new ErrorResponse(" Bad Request !", 400));
  }
  const user = await User.findById({ _id: user_id });
  if (!user) {
    return next(new ErrorResponse(`${user_id} is User Data Not Found !`, 404));
  }

  res.status(200).json({
    success: true,
    user: user,
  });
});

// @desc    유저 생성
// @route   POST /user
// @access  Public
exports.postUser = asyncHandler(async (req, res, next) => {
  const { username, name } = req.body;
  if (!username || !name) {
    return next(new ErrorResponse(" Bad Request !", 400));
  }
  const UserData = {
    username: username,
    name: name,
  };
  const user = new User(UserData);
  await user.save();

  res.status(200).json(user);
});
// @desc    유저 갱신
// @route   put /user/:user_id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const { age, name } = req.body;

  if (!user_id) {
    return next(new ErrorResponse(" Bad Request !", 400));
  }

  /** 유효성 검사 */
  // 파라미터 검사
  // 타입 검사
  if (age && typeof age !== "number")
    return next(new ErrorResponse("  age must be a number !", 400));
  if (name && typeof name.first !== "string" && typeof name.last !== "string")
    return next(
      new ErrorResponse("  first name and last name must be a String !", 400)
    );
  // 유효 파라미터 검사 후 추가
  let user = await User.findById(user_id);
  if (!user)
    return next(new ErrorResponse(`${user_id} is User Data Not Found !`, 404));

  console.log({ userBeforeEdit: user });
  if (age) user.age = age;
  if (name) {
    user.name = name;
    await Promise.all([
      Blog.updateMany({ "user._id": user_id }, { "user.name": name }),
      Blog.updateMany(
        {},
        { "comments.$[comment].userFullName": `${name.first} ${name.last}` },
        { arrayFilters: [{ "comment.user": user_id }] }
      ),
    ]);
  }
  await user.save();
  console.log({ userAfterEdit: user });

  // const user = await User.findByIdAndUpdate(user_id, req.body, {
  //   new: true, //요청을 해결하고 새로운 데이터로 보내기
  //   runValidators: true, // 유효성 검사
  // });

  res.status(200).json({
    success: true,
    user: user,
  });
});

// @desc    유저 삭제
// @route   delete /user/:user_id
// @access  private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  if (!user_id) {
    return next(new ErrorResponse(" Bad Request !", 400));
  }
  const [user] = await Promise.all([
    User.findOneAndDelete({ _id: user_id }),
    Blog.deleteMany({
      "user._id": user_id,
    }),
    Blog.updateMany(
      { "comments.user": user_id },
      { $pull: { comments: { user: user_id } } }
    ),
    Comment.deleteMany({ user: user_id }),
  ]);
  res.status(200).json({
    success: true,
  });
});
