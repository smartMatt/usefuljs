var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
  userId: Schema.Types.ObjectId,
  tags: [String],
  fields: [fieldSchema],
  resources: [resourceSchema],
  comments: [commentSchema]
})

var Post = mongoose.model('Post', postSchema);

module.exports.Post = Post;