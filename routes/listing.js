const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const { index } = require("../controllers/listings.js");
const multer = require("multer");
const {storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/filter/:id", wrapAsync(listingController.filter));
router.get("/search",wrapAsync(listingController.search));

//Index and create route
router
 .route("/")
 .get(wrapAsync(listingController.index))
 .post(
    isLoggedIn,
     upload.single('listing[image]'),
     validateListing,
     wrapAsync(listingController.createListing)
);


// New route
router.get("/new", isLoggedIn,listingController.renderNewForm);

//show , Update and Delete Route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);

// Edit route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;