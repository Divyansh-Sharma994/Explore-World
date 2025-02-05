const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");

module.exports.allListings = wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

module.exports.newListingPage = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
});

module.exports.createListing = wrapAsync(async (req, res) => {
  let url = req.file.path;
  let fileName = req.file.filename;
  console.log(url, "..", fileName);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, fileName };
  await newListing.save();
  req.flash("success", "Successfully New Listing Created!");
  res.redirect("/listings");
});

module.exports.editListingPage = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
});

module.exports.editListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let fileName = req.file.filename;
    listing.image = { url, fileName };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
});

module.exports.deleteListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");

  res.redirect("/listings");
});
