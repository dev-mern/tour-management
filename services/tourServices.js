const TourModel = require("../models/Tours")

async function createTourService(tour) {
    const tourRes = await TourModel.create(tour);

    return tourRes;
}
async function getTourService(filters,queries) {
    console.log(filters);
    
    const tours = await TourModel.find(filters)
                .skip(queries.skip)
                .limit(queries.limit)
                .select(queries.fields)
                .sort(queries.sortBy)
            
    // console.log(tours);
    return tours;
}
async function getTourByIdService(id) {
    const tour = await TourModel.findOne({_id:id});
    // increase view count
    const countView = await TourModel.updateOne({_id:id},{$inc:{view:1}})
    return tour;
}
async function updateTourService(tourID,data) {
    const tour = await TourModel.updateOne({_id:tourID},{$set:data},{runValidators:true});
    return tour;
}
async function getTopToursByViewService() {
    const tours = await TourModel.find({}).sort({"view":-1}).limit(3);
    return tours;
}
async function getTopCheapestToursService() {
    const tours = await TourModel.find({}).sort({"price":1}).limit(3);
    return tours;
}

module.exports = {
    createTourService,
    getTourService,
    getTourByIdService,
    updateTourService,
    getTopToursByViewService,
    getTopCheapestToursService
}