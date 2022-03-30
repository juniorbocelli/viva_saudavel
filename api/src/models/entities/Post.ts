import mongoose from 'mongoose';

class Post {
  id: mongoose.Types.ObjectId | string | undefined;
  title: string;
  description: string;

  tags: Array<string>;
  fileUpload?: string;
  upVote: number;

  creator: string;
  createdAt: Date;

  constructor(id: mongoose.Types.ObjectId | string | undefined, title: string, description: string, tags: Array<string> | undefined, fileUpload: string | undefined, upVote: number | undefined, creator: string, createdAt: Date | undefined) {
    this.id = id;

    this.title = title;
    this.description = description;

    this.tags = tags || [];
    this.fileUpload = fileUpload;
    this.upVote = upVote || 0;

    this.creator = creator;
    this.createdAt = createdAt || new Date();
  };
};

export default Post;