const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      res.json(thoughts);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thoughts were found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
  

      const userThought = await User.findOneAndUpdate(
        { _id: req.body.usertId },
        { $push: {thoughts: thought._id} },
        { runValidators: true, new: true }
      );
      res.json(userThought)

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// Update a thought
async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thoughts were found with this id!' });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json(err);
  }
},

  // Delete a course
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thoughts were found with that ID' });
      }
      res.json({ message: 'Thoughts were deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
// Create reaction stored in single tought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({_id:req.params.thoughtId}, {$addToSet:{reactions: req.body}});
      res.json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  // Delete reaction by the reaction's id
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate({_id:req.params.thoughtId}, {$pull:{reactions: req.params.reactionId}});
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
