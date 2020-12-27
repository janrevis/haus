const express = require('express');
const router = express.Router();
const comments = require('../controllers/commenting');

router.get('/comment', comments.getComments);

router.post('/comment', comments.addComment);

router.post('/register', comments.registerUser);
router.post('/login', comments.login);

module.exports = router;
