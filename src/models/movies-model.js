const  mongoose  = require("mongoose");
const { Schema } = require("mongoose");
const {actorsSchema,teamSchema} = require("./persons_models");

const movieSchema = Schema({
    Title: String,
    Realese_year: Date,
    Genres: String,
    Duration: String,
    Cast: [actorsSchema],
    Crew: [teamSchema]
},{
    timestamps:true

})

const Movie = mongoose.model("Movies", movieSchema );

module.exports=Movie;