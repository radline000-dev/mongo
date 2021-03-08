const mongoose = require("mongoose");
const { CommentSchema } = require("./Comment");
// Clear Blog Model

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isLive: { type: Boolean, required: true, default: false },
    user: {
      _id: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
      username: { type: String, required: true },
      name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
      },
    },
<<<<<<< HEAD
=======
    commentsCount: {
      type: Number,
      default: 0,
      required: true,
    },
>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
    comments: [CommentSchema],
  },
  { timestamps: true }
);
// //가상키
// BlogSchema.virtual("comments", {
//   ref: "comment",
//   localField: "_id",
//   foreignField: "blog",
// });

// BlogSchema.set("toObject", { virtuals: true });
// BlogSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("blog", BlogSchema);
