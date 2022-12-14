import { comment, user } from "../db/sequelize.js";
import fs from "fs";

/* COMMENT Controller */
const commentController = {
  createOne: async (req, res) => {
    if (!req.body.content && !req.file) {
      res.status(400).json({ message: "Commentaire vide." });
    } else {
      try {
        const Comment = await comment.create({
          author: req.auth.userId,
          postId: parseInt(req.params.postId),
          content: req.body.content ? req.body.content : null,
          imageUrl: req.file?.filename
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null,
        });
        res.status(200).send(Comment);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  },
  updateOne: async (req, res) => {
    const Comment = await comment.findByPk(req.params.commentId);
    if (
      !Comment ||
      (req.auth.userId !== Comment.author && req.auth.role === false)
    ) {
      res.status(401).json({ message: "You cannot update this comment." });
      return;
    }
    try {
      // update the content of the comment
      await Comment.update({
        content: req.body.content || null,
      });
      // send the updated comment as the response
      res.status(200).send(Comment);
    } catch (err) {
      // handle any errors
      res.status(400).send(err);
    }
  },
  deleteOne: async (req, res) => {
    const Comment = await comment.findByPk(req.params.commentId);
    if (
      !Comment ||
      (req.auth.userId !== Comment.author && req.auth.role === false)
    ) {
      res.status(401).json({ message: "You cannot delete this Comment." });
      return;
    }
    try {
      // Si le Comment contenait une image
      if (Comment.imageUrl) {
        const filename = Comment.imageUrl.split("/images/")[1];
        await fs.promises.unlink(`images/${filename}`);
      }
      await Comment.destroy();
      res.status(200).json({ message: "Comment deleted." });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};

export default commentController;
