const CommentModel = require("../models/comments_model");
const postModel = require("../models/posts_model");
const mongoose = require("mongoose");


const createComment = async (req, res) => {
    const { postId } = req.body;

    try {
        const post = await postModel.findById(postId);

        if (post) {
            const comment = await CommentModel.create(req.body);
            return res.status(202).send(comment);

        } else {
            return res.status(400).send("Post by ID not found");
        }
        

    } catch (err) {
        return res.status(400).send(err.message);
    }
};


const getCommentById = async (req, res) => {
    const id = req.params.id;
    try {
      const comment = await CommentModel.findById(id);
      if (comment) {
        res.send(comment);
      } else {
        res.status(400).send("Comment not found");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }

  
};


const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { comment } = req.body;
    
    if (!commentId) {
        return res.status(400).send("Invalid id");
    }
    if (!comment) {
        return res.status(400).send("Problem with comment");
    }

    try {
        const updated_comment = await CommentModel.findByIdAndUpdate(commentId, { comment }, 
        {
            new: true,
            runValidators: true,
        });

        if (updated_comment) {
            return res.status(202).send(updated_comment);

        } else {
            return res.status(400).send("Comment not found");
        }
        

    } catch (err) {
        return res.status(400).send(err.message);
    }
};


const deleteComment = async (req, res) => {
    const id = req.params.id;

    if (id) {
        try {
            const post = await CommentModel.findByIdAndDelete(id);
            if (post) {
                return res.status(200).send("Comment with id ${id} deleted successfully.");

            } else {
                return res.status(200).send("Comment not found");
            }

        } catch (err) {
            return res.status(400).send(err.message);
        }

    } else {
        return res.status(400).send("Invalid id");
    }
};


module.exports = {
    createComment,
    getCommentById,
    updateComment,
    deleteComment,
}
