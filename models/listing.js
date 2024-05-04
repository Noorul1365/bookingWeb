const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
        // type: String,
        // default:
        //     "https://www.shutterstock.com/shutterstock/photos/2138779249/display_1500/stock-photo-custom-hd-beach-sea-landscape-coconut-trees-wallpaper-d-photo-background-panel-home-decor-d-2138779249.jpg",
        // set: (v) =>
        //   v === "" ?
        //     "https://www.shutterstock.com/shutterstock/photos/2138779249/display_1500/stock-photo-custom-hd-beach-sea-landscape-coconut-trees-wallpaper-d-photo-background-panel-home-decor-d-2138779249.jpg"
        //     : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;