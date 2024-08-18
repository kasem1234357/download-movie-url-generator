//====================================================//
//==========core packeges ============================//
const express = require('express')
const cors = require('cors')

//====================================================//
//=========== Routes =================================//
const serverRoute1 = require('./routes/akwam')
const serverRoute2 = require('./routes/tuktuk')
const serverRoute3 = require('./routes/wecima')
//===================================================//
//============== meddlewares ========================//

const { globalHandleError } = require('./meddlewares')


//===================================================//
//============== other =============================//

const corsOptions = require('./config/corsConfig')

//=================================================//
//=============== app logic ======================//
const appExpress = express();
require("dotenv").config();

const app = (browser,page)=>{
    appExpress.use(express.json());
appExpress.use(express.urlencoded({ extended: false }))
appExpress.use(cors(corsOptions));
appExpress.use((req,res,next)=>{
    req.page = page
    req.browser = browser
    next()
})
appExpress.use('/server1',serverRoute1)
appExpress.use('/server2',serverRoute2)
appExpress.use('/server3',serverRoute3)

   appExpress.listen(8800, '0.0.0.0', () => {
    console.log("Backend server is running!");
   });
   //==============//
// handling routes not found error
appExpress.all('*',(req,res,next)=>{
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err)
})
// handling all types of mongoDb error and api error
appExpress.use(globalHandleError)
}
module.exports = app





