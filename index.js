const puppeteer = require("puppeteer");
require("dotenv").config();
const app = require('./app');



process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught Exception occured! Shutting down...');
    process.exit(1);
 })
const init = async()=>{
	try {
		const browser = await puppeteer.launch( {args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      "--disable-gpu"
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),			
							});
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
