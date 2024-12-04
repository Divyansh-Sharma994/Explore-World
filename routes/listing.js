const express = require("express");
const router = express.Router({mergeParams: true});
const {allListings, newListingPage, showListing, createListing, editListingPage, editListing, deleteListing} = require("../controllers/listing");
const {validateListing, isOwner} = require("../middleware/listing");
const {isLoggedIn} = require("../middleware/user");

router.get("/new", isLoggedIn, newListingPage);

router.route("/")
    .get(allListings)
    .post(isLoggedIn, validateListing, createListing);

router.route("/:id")
    .get(showListing)
    .put(isLoggedIn, isOwner, validateListing, editListing)
    .delete(isLoggedIn, isOwner, deleteListing);


router.get("/:id/edit", isLoggedIn, isOwner, editListingPage);

module.exports = router;
