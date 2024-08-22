const asyncErrorHandler = require("../wrapper_functions/asyncErrorHandler");

const blockResourceType = [ 'image', 'stylesheet', 'font', 'script' ] 
const blockResourceName = ['analytics',  
  'ads',  
  'tracker',  
  'font',  
  'mobile',  
  'video'];
/*||
*/
const generateFunc= async(browser,page,title)=>{
	try {
        // Block unnecessary resources
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
        // Go to the search page with the movie name
        await page.goto(`https://ak.sv/search?q=${encodeURIComponent(title)}`, {
            
        });

        // Wait for the first selector to appear before clicking
		
		const test = await page.$eval('.entry-box .entry-image a', element => element.href);
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
        await page.goto(test)

        const resolutions = await page.$$('.header-tabs.tabs li a')
		const result = []
	for(let i=0;i<resolutions.length;i++){
		const res =await resolutions[i]?.evaluate(el =>{
			return({res:el.textContent,
				tab:el.href.substr(el.href.indexOf("#"))
			})})
	         const downloadLink = await page.$eval(`${res.tab} .link-btn.link-download.d-flex.align-items-center.px-3`, element => element.href);
        const finalLink ='https://ak.sv/download/'+ downloadLink.substr(downloadLink.lastIndexOf('/')+1) +test.substr(test.indexOf('movie/')+
	 5)
         console.log('Download Link:', finalLink);
      result.push({
		res:res.res,
		url:finalLink
	  })
		
	}
		const finalResult =[]
	for(let item of result){
	   try {
			   
		   await page.goto(item.url);
			// Wait until no more than 2 network connections are open
		   
		   const actualLink = await page.$eval('.btn-loader a', element => element.href);
		   console.log(actualLink);
		   finalResult.push({
			   ...item,
			   url: actualLink
		   }) ;
	   } catch (error) {
		   console.error(`Error processing URL ${item.url}:`, error);
	   }

	}
		return finalResult
    } catch (error) {
        console.error('Error:', error.message);
    } 
}
const generateTvFuncEpsoide = async(browser,page,title,season,epsoide)=>{
		try {
        // Block unnecessary resources
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
        // Go to the search page with the movie name
		const pageTitle =`${title} الموسم ${seasons[season]}`
        // Wait for the first selector to appear before clicking
		console.log(pageTitle)
        await page.goto(`https://ak.sv/search?q=${encodeURIComponent(title)}+الموسم+${seasons[season]}`, {
            
        });
		const test = await page.$$('.entry-image')
	
		const href = await page.$$eval('.entry-image', (entries, title) => {  
			for (const entry of entries) {  
				const imgElement = entry.querySelector('picture img');  
				const linkElement = entry.querySelector('a');  
	
				// Check if img exists and match with the title  
				if (imgElement && linkElement && imgElement.alt.toLowerCase() === title) {  
					return linkElement.href; // Return the href if conditions are matched  
				}  
				
			}  
			 
			return {}; // Return null if no match is found  
		}, pageTitle);  
		console.log(href)
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
        await page.goto(href)

        const epsoides = await page.$$('.widget-body .row h2 a')
		const result = []
	
		const epsoideEl =await epsoides[(epsoides.length - epsoide)]?.evaluate(el =>{
			return({url:el.href,
				title:el.textContent
			})})
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
			await page.goto(epsoideEl.url)
			console.log(epsoideEl.url)
			const resolutions = await page.$$('.header-tabs.tabs li a')
		for(let i=0;i<resolutions.length;i++){
			const res =await resolutions[i]?.evaluate(el =>{
				return({res:el.textContent,
					tab:el.href.substr(el.href.indexOf("#"))
				})})
				 const downloadLink = await page.$eval(`${res.tab} .link-btn.link-download.d-flex.align-items-center.px-3`, element => element.href);
			const finalLink ='https://ak.sv/download/'+ downloadLink.substr(downloadLink.lastIndexOf('/')+1) +epsoideEl.url.substr(epsoideEl.url.indexOf('episode/')+
		 5)
			 console.log('Download Link:', finalLink);
		  result.push({
			res:res.res,
			url:finalLink
		  })
			
		}
			
	      
		
	
		return result
    } catch (error) {
        console.error('Error:', error.message);
    } 
}
const getListOfLinks = async(browser,page,pageNumber)=>{
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
	  const dt = []
      for(let i=190; i<194;i++){
		await page.goto(`https://ak.sv/series?page=${i}`);

		const searchResultSelector = '.entry-box .entry-image a';
		
		const textSelector = await page.$$(searchResultSelector);
		// console.log(textSelector.length);
		
		for(let i=0;i<textSelector.length;i++){
			
			const d =await textSelector[i]?.evaluate(el =>{
				return ({
					url:el.href,
					title:`${el.href.substr(el.href.lastIndexOf(`\/`)+1)}`
				})
			});
			dt.push(d)
		}
	  }
	return dt
}
const getEpsoide = asyncErrorHandler(async(req,res,next)=>{
	const {title,season,epsoide} = req.query
    const {browser,page} = req
    try {
        const data = await generateTvFuncEpsoide(browser,page,title,season,epsoide)
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
const generateServer1 =asyncErrorHandler(async(req,res)=>{
    const {title} = req.query
    const {browser,page} = req
    try {
        const data = await generateFunc(browser,page,title)
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
module.exports = {
    generateServer1,
    getEpsoide
}
