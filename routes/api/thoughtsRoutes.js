const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
  } = require('../../controllers/thoughtsController.js');

  router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

    // /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(createReaction);


  // /api/thoughts/:thoughtId/reactions
  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
