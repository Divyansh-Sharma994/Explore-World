const express = require("express");
const router = express.Router({mergeParams: true});
const {newReview, deleteReview} = require("../controllers/review");
const {isLoggedIn} = require("../middleware/user");
const {validateReview, isReviewAuthor} = require("../middleware/review");

router.post("/", isLoggedIn, validateReview, newReview);
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, deleteReview);

module.exports = router;
