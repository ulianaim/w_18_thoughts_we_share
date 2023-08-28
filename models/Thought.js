const { Schema, model, Types } = require('mongoose');
const reactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      require: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
     
    },
  }
)
// Schema to create Thoughts model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_lenght: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
     
    },
    username: {
      type: String,
      required: true,
    },

    reaction: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reaction.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
