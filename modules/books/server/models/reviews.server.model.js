/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Review Schema
 */
var ReviewSchema = new Schema({
  bookId: Schema.Types.ObjectId,
  reviews: [
    {
      reviewerName: {
        type: String,
        default: '',
        trim: true
      },
      reviewerEmail: {
        type: String,
        default: '',
        trim: true
      },
      comments: {
        type: String,
        default: 'No Comments',
        trim: true
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

mongoose.model('Review', ReviewSchema);
