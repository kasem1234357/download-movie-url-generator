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
const generate4 = async(browser,page,title)=>{
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
		console.log(test)
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
		let tab=""
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
		return result
    //     // Get the href of the download button
    
	
    } catch (error) {
        console.error('Error:', error.message);
    } 
} 
const generateFunc = async(browser,page,title,year)=>{
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

	// // Set screen size
	// await page.setViewport({width: 1080, height: 1024});
	// await page.screenshot({path:'example.png'})
	// // Type into search box
	// await page.type('.search-box__input', 'automate beyond recorder');
    //  console.log('done')
	// // Wait and click on first result
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
	  //https://www.tuktukcima.com/%D9%81%D9%8A%D9%84%D9%85-${title.toLowerCase()}-${year}-%D9%85%D8%AA%D8%B1%D8%AC%D9%85-%D8%A7%D9%88%D9%86-%D9%84%D8%A7%D9%8A%D9%86/watch/
//https://xn------nzebca5gd7ode0biglh.myciima-weciima.shop/watch/
	await page.goto(`https://www.tuktukcima.com/%D9%81%D9%8A%D9%84%D9%85-${title.toLowerCase()}-${year}-%D9%85%D8%AA%D8%B1%D8%AC%D9%85-%D8%A7%D9%88%D9%86-%D9%84%D8%A7%D9%8A%D9%86/watch/`);

	// // Set screen size
	// await page.setViewport({width: 1080, height: 1024});
	// await page.screenshot({path:'example.png'})
	// // Type into search box
	// await page.type('.search-box__input', 'automate beyond recorder');
    //  console.log('done')
	// // Wait and click on first result
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
const generate2 = async(browser,page,pageNumber)=>{
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
const generateServer3 =asyncErrorHandler(async(req,res)=>{
    const {title,year} = req.query
    const {browser,page} = req
    try {
        const data = await generateFunc(browser,page,title,year)
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
module.exports = {generateServer3}