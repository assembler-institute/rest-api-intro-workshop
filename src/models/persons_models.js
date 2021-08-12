const  mongoose  = require("mongoose");
const { Schema } = require("mongoose");

const actorsSchema = Schema({
    Name: String,
    Date_birth: Date,
    Place_birth: String,
    Caracter: String,   
},{
    timestamps:true

})

const teamSchema = Schema({
    Name: String,
    Date_birth: Date,
    Place_birth: String,
    Role: String,   
},{
    timestamps:true

})

const actors = mongoose.model("actors",actorsSchema );
const workers = mongoose.model("workers",teamSchema );
module.exports={
    actorsSchema:actorsSchema,
    teamSchema:teamSchema,
    actors:actors,
    workers:workers
}