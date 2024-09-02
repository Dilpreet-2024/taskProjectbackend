const Books = require('../models/addbooksModel.js');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Unique filename with timestamp
  },
});

const upload = multer({ storage: storage });

// Create new book with image upload
const createBook = async (req, res) => {
  try {
    const { Title, Author, isbn, Price, StockQuantity, Description } = req.body;

    // File upload handling
    const Image = req.file ? req.file.path : null;

    const newBook = new Books({
      Title,
      Author,
      isbn,
      Price,
      StockQuantity,
      Description,
      Image,
    });

    await newBook.save();

    res.status(201).json({ message: 'Book created successfully', bookDetails: newBook });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Failed to create book' });
  }
};

// Update book details
const updateBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const { Title, Author, isbn, Price, StockQuantity, Description } = req.body;

    // File upload handling (if file is provided)
    const Image = req.file ? req.file.path : req.body.Image;

    const updatedBook = await Books.findByIdAndUpdate(
      bookId,
      {
        Title,
        Author,
        isbn,
        Price,
        StockQuantity,
        Description,
        Image,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', bookDetails: updatedBook });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Failed to update book' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Books.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Failed to delete book' });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json({
      status: 200,
      success: true,
      message: 'All Books',
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ message: 'Failed to fetch book by ID' });
  }
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
  upload, // Export multer instance for file uploads
};
