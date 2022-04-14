const { Thought, User } = require("../models")

module.exports = {
  getThoughts: (req, res) => {
    Thought.find()
    .then(thoughts => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
  },
  getSingleThought: (req,res) => {
    Thought.find({_id: req.params.thoughtId})
    .then(thought => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
  createThought: (req, res) => {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        {_id: req.body.userId},
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then(user => res.json('Congratulations, you have just created thought!'))
  },
  updateThought: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText },
      { new: true }
    )
    .then(thought => {
      thought 
        ? res.json(thought)
        : res.status(505).json('Whoops, that thought did not work.')
    });
  },
  deleteThought: (req, res) => {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId }
    )
    .then((thought) => {
      return User.findOneAndUpdate(
        { username: thought.username},
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
    }).then(user => {
      user
        ? res.json('your thought has been deleted')
        : res.json('could not delete your thought')
    });
  }
}