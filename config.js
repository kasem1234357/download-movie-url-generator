require("dotenv").config();
const puppeteer = require("puppeteer");

const config = {
    args:[
         "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
      ],
      executablePath:process.env.NODE_ENV === "production"
					? process.env.PUPPETEER_EXECUTABLE_PATH
					: puppeteer.executablePath(),
      
      
}
module.exports = {config}
/*
executablePath:
				  process.env.NODE_ENV === "production"
					? process.env.PUPPETEER_EXECUTABLE_PATH
					: puppeteer.executablePath(),
          */
