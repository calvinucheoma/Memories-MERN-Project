import mongoose from 'mongoose';
import PostMessage from '../models/PostMessage.js';

// GET ALL POSTS
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    // console.log(postMessages);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE A NEW POST
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// UPDATE A POST
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const { creator, title, message, tags, selectedFile } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No post with id ${_id} `);

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { creator, title, message, tags, selectedFile },
      {
        new: true,
      }
    );

    // Check if the updatedPost is null (no post found with the given ID)
    if (!updatedPost) {
      return res.status(404).json({ message: `No post found with id ${_id}` });
    }

    res.status(200).json(updatedPost); // Send the updated post as JSON
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// DELETE A POST
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id ${id} `);

    const deletedPost = await PostMessage.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// LIKE A POST
export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id ${id} `);

    const post = await PostMessage.findById(id);

    if (!post) {
      return res.status(404).json({ message: `No post found with id ${_id}` });
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
