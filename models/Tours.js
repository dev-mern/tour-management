const { default: mongoose } = require("mongoose");

const tourSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Please provide a name"],
            trim: true,
            unique: [true,"Product name must be unique"],
            minLength:[3,"Name must be atleast 3 characters"],
            maxLength:[100,"Name is too large"]
        },
        image:{
            type: String,
            trim: true,
            minLength:[5,"Image Url must be atleast 3 characters"],
            maxLength:[250,"Image Url is too large"],
            validate:{
                validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
                message: "Must be a valid Url"
            },
        },
        price:{
            type: Number,
            required: true,
            min: [0, "Price can't be negative"]
        },
        view: {
            type: Number,
            required: true,
            default: 0,
            min: [0, "View can't be negative"]
        },
        description:{
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true,
            trim: true,
            minLength:[3,"Location must be atleast 3 characters"],
            maxLength:[100,"Location is too large"]
        },
    },
    {
        timestamps:true
    }
)

// tourSchema.pre("save",async function(next){next();})
// tourSchema.post("save",async function(doc,next){console.log(doc);next();})
// tourSchema.methods.logger = function(){console.log("calling this function from schema")}

const TourModel = mongoose.model("Tour",tourSchema);
module.exports = TourModel;