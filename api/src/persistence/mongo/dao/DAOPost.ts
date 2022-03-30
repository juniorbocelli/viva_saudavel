import mongoose from 'mongoose';

import DAO from '../../utils/DAO';
import PostSchema from '../schemas/PostSchema';
import Post from '../../../models/entities/Post';

class DAOPost implements DAO<Post, string> {
  isValidObjectId(post: Post | string): boolean {

    if (post instanceof Post)
      if (typeof (post.id) !== "undefined")
        return mongoose.Types.ObjectId.isValid(post.id)
      else
        return false;
    else
      return mongoose.Types.ObjectId.isValid(post);
  };

  async save(post: Post) {
    let postSchema: Post & mongoose.Document<any, any, Post>;

    if (typeof (post.id) === "undefined") {
      postSchema = new PostSchema({
        title: post.title,
        description: post.description,
        tags: post.tags,
        fileUpload: post.fileUpload,
        upVote: post.upVote,
        creator: post.creator,
        createdAt: post.createdAt,
      });
    } else {
      if (!this.isValidObjectId(post))
        throw `Invalid post id`;

      postSchema = new PostSchema({
        title: post.title,
        description: post.description,
        tags: post.tags,
        fileUpload: post.fileUpload,
        upVote: post.upVote,
        creator: post.creator,
        createdAt: post.createdAt,
        _id: post.id,
      });
    };

    await postSchema.save();

    post.id = postSchema._id;
  };

  async update(post: Post) {
    if (!this.isValidObjectId(post))
      throw 'Invalid post id';

    const foundedPost = await PostSchema.findById(post.id);

    const updatedPost = {
      title: post.title,
      description: post.description,
      tags: post.tags,
      fileUpload: post.fileUpload,
      upVote: post.upVote || foundedPost?.upVote,
      creator: post.creator,
      createdAd: post.createdAt || foundedPost?.createdAt,
      _id: post.id,
    };

    await PostSchema.findByIdAndUpdate(post.id, updatedPost, { new: true });
  };

  async saveOrUpdate(post: Post) {
    if (typeof (post.id) === "undefined") {
      this.save(post);
      return;
    };

    if (!this.isValidObjectId(post))
      throw `Invalid post id`;

    const singlePost = await PostSchema.findById(post.id);

    if (singlePost === null)
      this.save(post);
    else
      this.update(post);
  };

  async saveOrUpdateWithReturnId(post: Post): Promise<string> {
    await this.saveOrUpdate(post);

    return post.id!?.toString();
  };

  async delete(id: string) {
    if (!this.isValidObjectId(id))
      throw `Invalid post id`;

    await PostSchema.findByIdAndRemove(id);
  };

  async select(id: string): Promise<Post | null> {
    const post = await PostSchema.findById(id);

    if (post === null)
      return null;

    return new Post(post.id, post.title, post.description, post.tags, post.fileUpload, post.upVote, post.creator, post.createdAt);
  };

  async selectAll(): Promise<Array<Post>> {
    const posts = await PostSchema.find();
    let postsToReturn: Array<Post> = [];

    posts.forEach((post) => {
      postsToReturn.push(new Post(post.id, post.title, post.description, post.tags, post.fileUpload, post.upVote, post.creator, post.createdAt));
    });
    return postsToReturn;
  };
};

export default DAOPost;