let chrome = {};
let options = {};
let puppeteer;
if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}
if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }
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
		const browser = await puppeteer.launch(options);
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
