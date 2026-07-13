import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQuestionDocument extends Document {
  product: Types.ObjectId;
  user: Types.ObjectId;
  userName: string;
  question: string;
  answer?: string;
  answeredBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestionDocument>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      maxlength: [1000, "Question must be less than 1000 characters"],
    },
    answer: {
      type: String,
      trim: true,
      maxlength: [2000, "Answer must be less than 2000 characters"],
    },
    answeredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

QuestionSchema.index({ product: 1, createdAt: -1 });

export default mongoose.models.Question ||
  mongoose.model<IQuestionDocument>("Question", QuestionSchema);
