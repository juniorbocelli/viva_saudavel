import { Request, Response } from 'express';
import DAOPost from '../persistence/mongo/dao/DAOPost';
import Post from '../models/entities/Post';

class PostControler {
  static async getAllPosts(req: Request, res: Response) {
    const daoPost = new DAOPost;

    try {
      const posts = await daoPost.selectAll();

      res.status(200).json(posts);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async addPost(req: Request, res: Response) {
    const {
      title,
      description,
      fileUpload,
      creator,
      tags,
    } = req.body;

    const daoPost = new DAOPost;
    const post = new Post(undefined, title, description, tags, fileUpload, undefined, creator, undefined);

    try {
      await daoPost.save(post);

      res.status(200).json(post);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async getPost(req: Request, res: Response) {
    const { id } = req.params;

    const daoPost = new DAOPost;

    try {
      const post = await daoPost.select(id);

      res.status(200).json(post);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const {
      title,
      description,
      fileUpload,
      creator,
      tags,
    } = req.body;

    const daoPost = new DAOPost;
    const post = new Post(id, title, description, tags, fileUpload, undefined, creator, undefined);

    try {
      await daoPost.save(post);

      res.status(200).json(post);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async removePost(req: Request, res: Response) {
    const { id } = req.params;

    const daoPost = new DAOPost;

    try {
      await daoPost.delete(id);

      res.status(200).json({ message: "Successfuly removed" });
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };

  static async likePost(req: Request, res: Response) {
    const { id } = req.params;

    const daoPost = new DAOPost;

    try {
      const loadedPost = await daoPost.select(id);

      if (loadedPost !== null) {
        loadedPost.upVote++
        await daoPost.update(loadedPost);
      } else {
        throw `Post not exist`
      }

      res.status(200).json(loadedPost);
    } catch (error: any) {
      res.status(200).json({ error: error.message });
    };
  };
};

export default PostControler;