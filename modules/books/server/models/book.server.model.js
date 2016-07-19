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
  id: {
    type: Number,
    unique: true,
    trim: true,
    required: 'Id cannot be blank'
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  desc: {
    type: String,
    default: '',
    trim: true,
    required: 'Description cannot be blank'
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
  state: {
    type: Boolean,
    default: false,
    required: 'Title cannot be blank'
  },
  isbn: {
    type: String,
    default: '',
    trim: true,
    required: 'ISBN cannot be blank'
  },
  numberOfCopies: {
    type: Number,
    default: 1,
    required: 'There should be a single copy atleast.'
  },
  condition: {
    type: String,
    default: 'new & good',
    trim: true,
    required: 'condition cannot be blank'
  },
  location: {
    type: String,
    default: '2nd floor',
    trim: true,
    required: 'Please tell the user where its available.'
  },
  contributedBy: {
    type: String,
    default: 'Admin',
    trim: true,
    required: 'Contiributor name is mandatory.'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  reviewLink: {
    type: String,
    default: '',
    trim: true
  },
  imageUrl: {
    type: String,
    default: '',
    trim: true,
    required: 'ImageUrl cannot be blank'
  },
  numberOfPages: {
    type: Number,
    default: ''
  },
  keywords: {
    type: String,
    default: '',
    trim: true,
    required: 'comma seperated keywords are expected.'
  },
  language: {
    type: String,
    default: '',
    trim: true
  },
  requestQueue: {
    userId: {
      type: Schema.Types.ObjectId,
      default: '',
      trim: true,
      required: 'UserID cannot be blank'
    },
    queueNumber: {
      type: Number
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: '',
    trim: true,
    required: 'Please enter the name of the creator.'
  },
  updatedBy: {
    type: String,
    default: '',
    trim: true,
    required: 'Please enter the name of the person who updated.'
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Book', BookSchema);
