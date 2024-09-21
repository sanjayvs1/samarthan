const mongoose = require("mongoose");

const AdminQuestionSchema = mongoose.Schema(
  {
    question: {
      text: { type: String },
    },
    language: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Questions", AdminQuestionSchema);
