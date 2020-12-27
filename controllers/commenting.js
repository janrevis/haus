const Comment = require('../models/comment');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const db = require("../models")
const commenting = {

  async getComments(req, resp) {
    const comments = await db.sequelize.models.Comment.findAll();
    resp.send(comments);
  },

  async addComment(req, resp) {
    const comment = req.body.comment;
    const userId = req.session.userId;
    const user = await db.sequelize.models.User.findOne({ id: userId });
    if (!user) {
      resp.status(400).send('valid user id not provided');
    }
    const commentObj = await db.sequelize.models.Comment.create({
      comment,
      UserId: userId
    });
    resp.status(201).send(commentObj);
  },

  async registerUser(req, resp) {
    const email = req.body.email;
    if (await User.findOne({ where: { email }})) {
      resp.status(400).send(`User with email ${em} already registered`);
      return;
    }
    const password = await bcrypt.hash(req.body.password, 10);
    await User.create({
        email,
        password
    });
    resp.status(201).send();
  },

  async login(req, resp) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.sequelize.models.User.findOne({ where: { email }});
    if (!user) {
      resp.status(403).send("Your email or password was not found");
      return;
    }
    if (!await bcrypt.compare(password, user.password)) {
      resp.status(403).send("Your email or password was not found");
      return;
    }
    const session = req.session;
    session.userId = user.id;
    resp.status(201).send();
  }
}

module.exports = commenting;
