const PostModel = require("../models/posts_model");


const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPosts = async (req, res) => { 

  const filter = req.query.sender;
  try {
    if (filter) {
      const posts = await PostModel.find({ sender: filter });
      res.send(posts);
    } else {
      const posts = await PostModel.find();
      res.send(posts);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }

};

const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    if (post) {
      res.send(post);
    } else {
      res.status(400).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getPostBySender = async (req, res) => {
  const filter = req.query;
  console.log(filter);
  try {
    if (filter.sender) {
      const post = await PostModel.find({ sender: filter.sender });
      res.send(post);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updatedPost = async (req, res) => {
  const id = req.params.id;
  const { sender, message } = req.body;

  if (!id) {
    return res.status(400).send("Post ID is required");
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(id, { sender, message });
    if (updatedPost) {
      updatedPost.sender = sender;
      updatedPost.message = message;
      await updatedPost.save();
      res.send(updatedPost);
    } else {  
      res.status(400).send("Post not found");
    }
} catch (error) {
  res.status(400).send(error.message);
}
};



module.exports = {
  createPost,
  getPosts,
  getPostById,
  getPostBySender,
  updatedPost,
};