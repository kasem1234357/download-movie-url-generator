const express = require('express')
const cors = require('cors')
const blockResourceType = [ 'image', 'stylesheet', 'font', 'script' ] 
const blockResourceName = ['analytics',  
  'ads',  
  'tracker',  
  'font',  
  'mobile',  
  'video'];
const appExpress = express();
require("dotenv").config();
const generate3 = async(browser,page,title,year)=>{
    // Navigate the page to a URL
	await page.setRequestInterception(true);
    page.on("request", (req) => {
		const requestUrl = req.url();
		if (!req.isInterceptResolutionHandled())
		  if (
			blockResourceType.includes(req.resourceType()) ||
			blockResourceName.some((resource) => requestUrl.includes(resource))
		  ) {
			req.abort();
		  } else {
			req.continue();
		  }
	  });
	await page.goto(`https://www.tuktukcima.com/%D9%81%D9%8A%D9%84%D9%85-${title.toLowerCase()}-${year}-%D9%85%D8%AA%D8%B1%D8%AC%D9%85-%D8%A7%D9%88%D9%86-%D9%84%D8%A7%D9%8A%D9%86/watch/`);

	const searchResultSelector = '.watch--servers--list .downloads a';
	
	const textSelector = await page.$$(searchResultSelector);
	// console.log(textSelector.length);
	const dt = []
	for(let i=0;i<textSelector.length;i++){
		
		const d =await textSelector[i]?.evaluate(el =>{
			return ({
				url:el.href,
			})
		});
		dt.push(d)
	}
	
	return dt
}
const generate = async(browser,page,title,year)=>{
    // Navigate the page to a URL
	await page.setRequestInterception(true);
    page.on("request", (req) => {
		const requestUrl = req.url();
		if (!req.isInterceptResolutionHandled())
		  if (
			blockResourceType.includes(req.resourceType()) ||
			blockResourceName.some((resource) => requestUrl.includes(resource))
		  ) {
			req.abort();
		  } else {
			req.continue();
		  }
	  });
//https://xn------nzebca5gd7ode0biglh.myciima-weciima.shop/watch/
	await page.goto(`https://wecima.show/watch/%d9%85%d8%b4%d8%a7%d9%87%d8%af%d8%a9-%d9%81%d9%8a%d9%84%d9%85-${title.toLowerCase()}-${year}-%d9%85%d8%aa%d8%b1%d8%ac%d9%85/`);


	const searchResultSelector = '.List--Download--Wecima--Single a';
	
	const textSelector = await page.$$(searchResultSelector);
	// console.log(textSelector.length);
	const dt = []
	for(let i=0;i<textSelector.length;i++){
		
		const d =await textSelector[i]?.evaluate(el =>{
			return ({
				url:el.href,
				res:el.children[1]?.textContent,
				q:el.children[0]?.textContent
			})
		});
		dt.push(d)
	}
	
	return dt
}
const generateTv = async(browser,page,title,epsoide,season)=>{
	await page.goto(`https://xn------nzebcaa6hd5qde3bjgmh.myciima-weciima.shop/watch/%d9%85%d8%b4%d8%a7%d9%87%d8%af%d8%a9-%d9%85%d8%b3%d9%84%d8%b3%d9%84-${title.toLowerCase()}-%d9%85%d9%88%d8%b3%d9%85-${season}-%d8%ad%d9%84%d9%82%d8%a9-${epsoide}/`);
	const searchResultSelector = '.List--Download--Wecima--Single a';
	
	const textSelector = await page.$$(searchResultSelector);
	// console.log(textSelector.length);
	const dt = []
	for(let i=0;i<textSelector.length;i++){
		
		const d =await textSelector[i]?.evaluate(el =>{
			return ({
				url:el.href,
				res:el.children[1]?.textContent,
				q:el.children[0]?.textContent
			})
		});
		dt.push(d)
	}
	return dt
}
const app = (browser,page)=>{
    appExpress.use(express.json());
appExpress.use(express.urlencoded({ extended: false }))
appExpress.use(cors());
	appExpress.get('/tuktuk',async(req,res)=>{
    const {name,year} = req.query
    console.log(req.query)
    const correctName = name.replace(/[^a-zA-Z0-9: ]/g, "").split(' ').join('-')
    try {
        const data = await generate3(browser,page,correctName,year)
        console.log(data)
        if(data){
            res.status(200).json(data)
        }else{
            res.status(403).json({msg:'not found'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
    appExpress.get('/get-links',async(req,res)=>{
		const {name,year} = req.query
		console.log(req.query)
        const correctName = name.replace(/[^a-zA-Z0-9: ]/g, "").split(' ').join('-')
        try {
            const data = await generate(browser,page,correctName,year)
			console.log(data)
            if(data){
                res.status(200).json(data)
            }else{
                res.status(403).json({msg:'not found'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
   })
   appExpress.post('/get-links-tv',async(req,res)=>{
	const {name,epsoide,season} = req.body
	const correctName = name.replace(/[^a-zA-Z0-9: ]/g, "").split(' ').join('-')
	
	try {
		const data = await generateTv(browser,page,correctName,epsoide,season)
		if(data){
			res.status(200).json(data)
		}else{
			res.status(404).json({msg:'not found'})
		}
	} catch (error) {
		res.status(500).json(error)
	}
})
   appExpress.listen(8800, () => {
    console.log("Backend server is running!");
   });
}
module.exports = app
