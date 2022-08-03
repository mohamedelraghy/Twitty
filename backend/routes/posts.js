const express = require('express');


const postController = require('../controllers/posts');


const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');


const router = express.Router();



router.get('', postController.listPosts);
router.get('/:id', postController.getPost);
router.post('', checkAuth, extractFile, postController.createPost);
router.put('/:id', checkAuth, extractFile, postController.editPost);
router.delete('/:id', checkAuth, postController.removePost);


module.exports = router;
