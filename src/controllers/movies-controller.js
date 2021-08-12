const db = require("../models");

async function addMovie(req, res){
    const {
        Title,
        Realese_year,
        Genres,
        Duration,
        Cast,
        Crew,
    } = req.body
    try{
        const {_id} = await db.Movie.create({
            Title:Title,
            Realese_year:Realese_year,
            Genres:Genres,
            Duration:Duration,
            Cast:Cast,
            Crew:Crew
        });

        return res.status(200).send({
            message:"The movie has been added correctly"
        })
    }catch(err){
        return res.status(500).send({
            error:err
        })
    }
}

module.exports={
    addMovie:addMovie
}