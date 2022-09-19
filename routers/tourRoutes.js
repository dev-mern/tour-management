const express = require('express');
const { createProductCtl, getToursCtl, getToursByIdCtl, updateToursByIdCtl, getTop3ViewedToursCtl, getTop3CheapestToursCtl } = require('../controllers/tourController');

const tourRouter = express.Router();

tourRouter.route("/tour/trending")
    .get(getTop3ViewedToursCtl)

tourRouter.route("/tour/cheapest")
    .get(getTop3CheapestToursCtl)


tourRouter.route("/tours")
    // get all tour with pagination and other query filter
    .get(getToursCtl)
    // insert a new tour
    // body: {"name":"Forest Tour","location":"Sundarban","description":"lorem imsum","price": -20}
    .post(createProductCtl)


tourRouter.route("/tours/:id")
    // get all tour with pagination and other query filter
    .get(getToursByIdCtl)

tourRouter.route("/tour/:id")
    // update a tour
    .patch(updateToursByIdCtl)



module.exports = tourRouter;
