const { Thought, User } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ 
      _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => (!thought ? res.status(404).json({ message: "Unfortunetly there is no thought with that ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate({ 
          username: req.body.username }, { 
          $addToSet: { thoughts: thought._id } }, { new: true });
      })
      .then((user) => (!user ? res.status(404).json({ message: "Thought has been created without an ID" }) : res.json("Your thought has been added")))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ 
      _id: req.params.thoughtId }, { 
      $set: req.body }, { runValidators: true, new: true })
      .then((thought) => (!thought ? res.status(404).json({ message: "Unfortunetly there is no thought with that ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ 
      _id: req.params.thoughtId })
      .then((thought) => (!thought ? res.status(404).json({ message: "There is no thought that goes with this ID" }) : User.findOneAndUpdate({ 
        thoughts: req.params.thoughtId }, { 
        $pull: { thoughts: req.params.thoughtId } }, { new: true })))
      .then((user) => (!user ? res.status(404).json({ message: "This thought is deleted but is not attached to a user" }) : res.json({ message: "Your thought has been deleted" })))
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate({ 
      _id: req.params.thoughtId }, { 
      $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
      .then((thought) => (!thought ? res.status(404).json({ message: "There is no thought that goes with this ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate({ 
      _id: req.params.thoughtId }, { 
      $pull: { reactions: { reactionId: req.body.reactionId } } }, { runValidators: true, new: true })
      .then((thought) => (!thought ? res.status(404).json({ message: "There is no thought that goes with this ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
};