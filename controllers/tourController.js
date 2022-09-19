const { createTourService, getTourService, getTourByIdService, updateTourService, getTopToursByViewService, getTopCheapestToursService } = require("../services/tourServices");

// create a new Tour
async function createProductCtl(req,res) {
    try {
        const tour = await createTourService(req.body);
        
        res.status(400).json({data:tour,error:"success",message:"data saved successfully"})
    } catch (error) {
        res.status(400).json({data:{},error:"fail",message: error.message})
    }
}

// get all Tours
async function getToursCtl(req,res) {
    try {
        // separate filters
        let filters ={...req.query};
        const excludeFields = ['sort','limit','page'];
        excludeFields.forEach(field => delete filters[field])
        const filteredString = JSON.stringify(filters).replace(/\b(gt|lt|gte|lte)\b/g,match=>`$${match}`);
        filters = JSON.parse(filteredString);
        
        // separate queries
        const queries = {}
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }
        if (req.query.page) {
            const {page=0,limit=10} = req.query;
            const skip = (page-1)* Number(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }
        
        const tours = await getTourService(filters,queries);
        res.status(400).json({data:tours,error:"success",message:""})
    } catch (error) {
        res.status(400).json({data:{},error:"fail",message: error.message})
    }
}

// get a  Tour by ID
async function getToursByIdCtl(req,res) {
    try {
        const {id} = req.params;
        const tour = await getTourByIdService(id);
        
        res.status(400).json({data:tour,error:"success",message:"data fetched successfully"})
    } catch (error) {
        res.status(400).json({data:{},error:"fail",message: error.message})
    }
}
// update  a Tour by ID
async function updateToursByIdCtl(req,res) {
    try {
        const {id} = req.params;
        const tour = await updateTourService(id,req.body);
        
        res.status(400).json({data:tour,error:"success",message:"data updated successfully"})
    } catch (error) {
        res.status(400).json({data:{},error:"fail",message: error.message})
    }
}
// get top 3 tours by view
async function getTop3ViewedToursCtl(req,res) {
    try {
        const topTours = await getTopToursByViewService()
        
        res.status(400).json({data:topTours,error:"success",message:"data updated successfully"})
    } catch (error) {
        res.status(400).json({data:{},error:"fail",message: error.message})
    }
}
// get top 3 cheapest tours by view
async function getTop3CheapestToursCtl(req,res) {
    try {
        const topTours = await getTopCheapestToursService()
        
        res.status(400).json({data:topTours,error:"success",message:"data updated successfully"})
    } catch (error) {
        res.status(400).json({data:{},error:"fail",message: error.message})
    }
}


module.exports ={
    createProductCtl,
    getToursCtl,
    getToursByIdCtl,
    updateToursByIdCtl,
    getTop3ViewedToursCtl,
    getTop3CheapestToursCtl
}