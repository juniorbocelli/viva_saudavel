import mongoose from "mongoose";
import Post from '../../../models/entities/Post'

const postSchema = new mongoose.Schema<Post>({
  title: {
    type: String,
    required: [true, 'The title is required'],
  },
  description: {
    type: String,
    required: [true, 'The description is required'],
  },
  tags: [String],
  fileUpload: {type: String, required: false},
  upVote: {
    type: Number,
    default: 0,
    required: [true, 'The initial value for votes is required'],
  },
  creator: {
    type: String,
    required: [true, 'The creator user is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: [true, 'The date of creation is required'],
  },
});

var PostSchema = mongoose.model("Post", postSchema);

export default PostSchema;