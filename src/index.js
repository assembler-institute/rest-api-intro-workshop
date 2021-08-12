const app = require("./server");
const  config  = require("./config");
const connect = require("./db");
// const { urlencoded } = require("body-parser");

// app.set('tokken_key', config.accessToken.tokkenKey);
// app.use(urlencoded({ extended: true }));

connect().then(async ()=>{
    //config.logger.info("DB connected!");
    app.listen(config.app.port,()=>{
        console.log(`Server running at port ${config.app.port}`)
    })

});

