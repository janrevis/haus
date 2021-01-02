const bcrypt = require('bcrypt');
const db = require("../models");

const LOGIN_ERR_MESSAGE = "A match for the provided email and password could not be found";

const commenting = {

  async getComments(req, resp, next) {
    try {
      let comments = await db.sequelize.models.Comment.findAll({
        where: { UserId: req.session.userId },
        order: [ ['createdAt', 'DESC'] ]
      });
      resp.status(200).send(comments);
    } catch(err) {
      next(err);
    }
  },

  async addComment(req, resp, next) {
    try {
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
    } catch (err) {
      next(err);
    }
  },

  async registerUser(req, resp, next) {
    try {
      const email = req.body.email;
      if (await db.sequelize.models.User.findOne({ where: { email }})) {
        resp.status(400).send({ message: `User with email ${email} already registered` });
        return;
      }
      const password = await bcrypt.hash(req.body.password, 10);
      await db.sequelize.models.User.create({
          email,
          password
      });
      resp.status(201).send();
    } catch(err) {
      next(err);
    }
  },

  async login(req, resp, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await db.sequelize.models.User.findOne({ where: { email }});
      if (!user) {
        resp.status(403).send({ message: LOGIN_ERR_MESSAGE });
      } else if (!await bcrypt.compare(password, user.password)) {
        resp.status(403).send({ message: LOGIN_ERR_MESSAGE });
      } else {
        const session = req.session;
        session.userId = user.id;
        resp.status(200).send("");
      }
    } catch(err) {
      console.log('call next');
      next(err);
    }
  }
}

module.exports = commenting;
