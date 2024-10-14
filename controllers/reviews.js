const Review = require('../models/review');
const Campground = require("../models/campground");


module.exports.create = async (req, res) => {
    const { id } = req.params;
    const review = new Review(req.body.review);
    review.author = req.user._id;
    const campground = await Campground.findById(id);
    if (campground) {
        campground.reviews.unshift(review);
        await review.save();
        await campground.save();
        req.flash('success', 'Added your review!');
    }

    res.redirect(`/campgrounds/${id}`);
}

module.exports.delete = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!');
    res.redirect(`/campgrounds/${id}`);
}