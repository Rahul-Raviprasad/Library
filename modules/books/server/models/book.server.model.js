'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Book Schema
 */
var BookSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  desc: {
    type: String,
    default: '',
    trim: true
  },
  author: {
    type: String,
    default: '',
    trim: true,
    required: 'Author name be blank'
  },
  publications: {
    type: String,
    default: '',
    trim: true,
    required: 'Publications cannot be blank'
  },
  category: {
    type: String,
    default: '',
    trim: true,
    required: 'Category cannot be blank'
  },
  status: {
    type: String,
    default: 'available'
  },
  isbn: {
    type: String,
    default: '',
    trim: true,
    required: 'ISBN cannot be blank'
  },
  numberOfCopies: {
    type: Number,
    default: 1
  },
  condition: {
    type: String,
    default: 'new & good',
    trim: true
  },
  location: {
    type: String,
    default: '2nd floor',
    trim: true
  },
  contributedBy: {
    type: String,
    default: 'Admin',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  userName: {
    type: String,
    default: '',
    trim: true
  },
  userEmail: {
    type: String,
    default: '',
    trim: true
  },
  reviewLink: {
    type: String,
    default: '',
    trim: true
  },
  imageURL: {
    type: String,
    default: '',
    trim: true
  },
  numberOfPages: {
    type: Number,
    default: ''
  },
  keywords: {
    type: String,
    default: '',
    trim: true
  },
  language: {
    type: String,
    default: '',
    trim: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: '',
    trim: true
  },
  updatedBy: {
    type: String,
    default: '',
    trim: true
  },
  updatedOn: {
    type: Date,
    default: Date.now
  },
  queueList: [
    {
      requesterName: {
        type: String,
        default: '',
        trim: true
      },
      requesterEmail: {
        type: String,
        default: '',
        trim: true
      },
      queueNumber: Number
    }
  ],
  loggedUserRequested: {
    type: Boolean,
    default: false
  },
  loggedUserQueueNumber: Number,
  isBookWithAdmin: {
    type: Boolean,
    default: false
  },
  submitRequestApproved: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Book', BookSchema);
