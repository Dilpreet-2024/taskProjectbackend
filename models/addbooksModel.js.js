const mongoose = require('mongoose');

const addbooksSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  StockQuantity: {
    type: String,
  },
  Description: {
    type: String,
    required: true,
  },
  Image: {
    type: String, 
  },
  
  
});

module.exports = mongoose.model('Books', addbooksSchema);
