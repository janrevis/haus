const express = require('express');
const router = express.Router();
const comments = require('../controllers');
const validateSession = require('../middleware/validate-session');

router.get('/comment', validateSession, comments.getComments);
router.post('/comment', validateSession, comments.addComment);
router.post('/register', comments.registerUser);
router.post('/login', comments.login);

module.exports = router;
