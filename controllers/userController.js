const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all students
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate("thoughts")
        .populate("friends")

      if (!users) {
        return res.status(404).json({ message: 'No student with that ID' })
      }
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new student
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({_id:req.params.userId}, {$set: req.body});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thoughts = await Thought.deleteMany(
        { _id: {
          $in:user.thoughts
        }},
      );

      if (!thoughts) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }

      res.json({ message: 'User and assosiated thoughts were successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({_id:req.params.userId}, {$addToSet:{friends: req.params.friendId}});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({_id:req.params.userId}, {$pull:{friends: req.params.friendId}});
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
