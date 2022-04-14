const { Schema, model } = require("mongoose");
// deleting and attempting a child / subdoc reaction schema to parent thought schema 
// const Reaction = require("./Reaction"); 

const reactionSchema = new Schema({
  reactionId: { 
    type: Schema.Types.ObjectId, 
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String, 
    required: true, 
    maxlength: 280
  },
  username: {
    type: String, 
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String, 
    required: true, 
    minlength: 1, 
    maxlength: 280
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
  username: {
    type: String, 
    required: true},
  reactions: [reactionSchema]
});

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;