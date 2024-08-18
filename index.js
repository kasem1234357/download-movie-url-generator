const puppeteer = require('puppeteer');
const app = require('./app');
const { config } = require('./config');
require("dotenv").config();

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception occured! Shutting down...');
    process.exit(1);
 })
const init = async()=>{
	try {
		const browser = await puppeteer.launch(
			{
    args:[
        "--disable-setuid-sandbox",
				  "--no-sandbox",
				  "--single-process",
				  "--no-zygote",
      ],
      headless: "new",
      ignoreHTTPSErrors: true,
      
}
		  );
	const page = await browser.newPage();
     app(browser,page)	;
	} catch (error) {
		 console.log(error);
	}

}
init();
process.on('unhandledRejection', (err) => {
	console.log(err.name, err.message);
	console.log('Unhandled rejection occured! Shutting down...');
 
	server.close(() => {
	 process.exit(1);
	})
 })
