const { Schema, model } = require('mongoose');

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
    reactions: {
      type: String,
      required: true,
    }, 

    reaction: [
    {
      
    }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactins.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
