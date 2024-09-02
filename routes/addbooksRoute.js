const express = require('express');
const router = express.Router();
const addbooksController = require('../controllers/addbooksController');


const upload = addbooksController.upload;

//add book
router.post('/add', upload.single('Image'), addbooksController.createBook);

//update
router.put('/:id', upload.single('Image'), addbooksController.updateBook);

//delete
router.delete('/:id', addbooksController.deleteBook);

//getAll
router.get('/', addbooksController.getAllBooks);

//get by ID
router.get('/:id', addbooksController.getBookById);

module.exports = router;
