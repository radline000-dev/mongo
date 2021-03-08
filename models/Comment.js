const mongoose = require("mongoose");

// Clear Base Comment Model
const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
    userFullName: { type: String, required: true },
    blog: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "blog",
      required: [true, " Blog is Required"],
    },
  },
  { timestamps: true }
);

<<<<<<< HEAD
=======
CommentSchema.index({ blog: 1, createdAt: -1 });

>>>>>>> 51a808eeb6a152e2c25779633ce9560ab5fadaf5
const Comment = mongoose.model("comment", CommentSchema);
module.exports = { Comment, CommentSchema };
