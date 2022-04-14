const router = require('express').Router();
const reactionRoutes = require('./reactionRoutes');
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought
} = require("../../controllers/thoughtController");

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)
router.use('/:thoughtId/reactions', reactionRoutes);

module.exports = router;