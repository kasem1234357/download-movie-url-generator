const asyncErrorHandler = require("../wrapper_functions/asyncErrorHandler");

const blockResourceType = [ 'image', 'stylesheet', 'font', 'script' ] 
const blockResourceName = ['analytics',  
  'ads',  
  'tracker',  
  'font',  
  'mobile',  
  'video'];
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
const generateServer2 =asyncErrorHandler(async(req,res)=>{
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
module.exports = {
    generateServer2
}