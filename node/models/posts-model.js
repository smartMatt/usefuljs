var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var fieldSchema = new Schema({
  type: String,
  value: String,
  codeType: String
})

var resourceSchema = new Schema({
  href: String,
  displayValue: String
})

var postSchema = new Schema({
  title: String,
  dateCreated: Date,
  userId: Schema.Types.ObjectId,
  tags: [String],
  fields: [fieldSchema],
  resources: [resourceSchema]
})

var Post = mongoose.model('Post', postSchema);

module.exports.Post = Post;