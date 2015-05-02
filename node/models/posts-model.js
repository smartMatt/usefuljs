var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require('../config');

var fieldSchema = new Schema({
  type: String,
  value: String,
  codeType: String,
  displayOrder: Number
})

var resourceSchema = new Schema({
  href: String,
  displayValue: String
})

var commentSchema = new Schema({
  username: String,
  userId: Schema.Types.ObjectId,
  dateCreated: Date,
  value: String
})

var postSchema = new Schema({
  title: String,
  dateCreated: Date,
  lastUpdated: Date,
  userId: Schema.Types.ObjectId,
  isPublic: Boolean,
  tags: [String],
  fields: [fieldSchema],
  resources: [resourceSchema],
  comments: [commentSchema]
})

var Post = mongoose.model(config.postCollection, postSchema);

module.exports.Post = Post;