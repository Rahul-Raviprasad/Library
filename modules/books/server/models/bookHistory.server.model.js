/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Review Schema
 */
var BookHistorySchema = new Schema({
  bookId: Schema.Types.ObjectId,
  history: [
    {
      action: {
        type: String,
        default: '',
        trim: true
      },
      comments: {
        type: String,
        default: '',
        trim: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdOn: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: 'admin',
    trim: true
  },
  updatedBy: {
    type: String,
    default: 'admin',
    trim: true
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('BookHistory', BookHistorySchema);
