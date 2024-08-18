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
    generateServer1
}
