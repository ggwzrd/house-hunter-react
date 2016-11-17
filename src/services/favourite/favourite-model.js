'use strict';

// favourite-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  postId: { type: String, required: true },
  createdBy: { type: Number, required: true, 'default': null},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'user' }
});

const favouriteModel = mongoose.model('favourite', favouriteSchema);

module.exports = favouriteModel;
