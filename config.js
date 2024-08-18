require("dotenv").config();

const config = {
    args:[
        '--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'
      ],
      executablePath:process.env.PUPPETEER_EXECUTABLE_PATH,
      headless:"new",
      
}
module.exports = {config}
/*
executablePath:
				  process.env.NODE_ENV === "production"
					? process.env.PUPPETEER_EXECUTABLE_PATH
					: puppeteer.executablePath(),
          */