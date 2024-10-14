const Campground = require('./models/campground');
const Review = require('./models/review');
const { campgroundValSchema, reviewValSchema } = require('./validation/schemas');
const ExpressError = require('./utils/ExpressError')


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    }
    next();
}


module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}


module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'No permission');
        return res.redirect(`/campgrounds/${campground._id}`);
    }
    else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'No permission');
        return res.redirect(`/campgrounds/${id}`);
    }
    else {
        next();
    }
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundValSchema.validate(req.body);
    if (error) {
        const message = error.details.map(e => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewValSchema.validate(req.body);
    if (error) {
        const message = error.details.map(e => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        next();
    }
}
