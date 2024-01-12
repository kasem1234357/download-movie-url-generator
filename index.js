const puppeteer = require('puppeteer');
const app = require('./app')
const url = `https://weciimaa.online/watch/%d9%85%d8%b4%d8%a7%d9%87%d8%af%d8%a9-%d9%81%d9%8a%d9%84%d9%85-earth-and-blood-2020-%d9%85%d8%aa%d8%b1%d8%ac%d9%85/`
// const test = async (title) => {
// 	// Launch the browser and open a new blank page
	
  
// 	// Navigate the page to a URL
// 	await page.goto(`https://weciimaa.online/watch/%d9%85%d8%b4%d8%a7%d9%87%d8%af%d8%a9-%d9%81%d9%8a%d9%84%d9%85-${title}-%d9%85%d8%aa%d8%b1%d8%ac%d9%85/`);
   
// 	// // Set screen size
// 	// await page.setViewport({width: 1080, height: 1024});
// 	// await page.screenshot({path:'example.png'})
// 	// // Type into search box
// 	// await page.type('.search-box__input', 'automate beyond recorder');
//      console.log('done')
// 	// // Wait and click on first result
// 	const searchResultSelector = '.List--Download--Wecima--Single a';
	
// 	const textSelector = await page.$$(searchResultSelector);
// 	console.log(textSelector.length);
// 	const dt = []
// 	for(let i=0;i<textSelector.length;i++){
		
// 		const d =await textSelector[i]?.evaluate(el =>{
// 			return ({
// 				url:el.href,
// 				res:el.children[1]?.textContent,
// 				q:el.children[0]?.textContent
// 			})
// 		});
// 		dt.push(d)
// 	}
// 	console.log(dt);
// 	// const fullTitle = await textSelector?.evaluate(el => el.href);
//     // console.log(fullTitle);
// 	// await page.click(searchResultSelector);
  
// 	// // Locate the full title with a unique string
// 	// const textSelector = await page.waitForSelector(
// 	//   'text/Customize and automate'
// 	// );
// 	// const fullTitle = await textSelector?.evaluate(el => el.textContent);
  
// 	// // Print the full title
// 	// console.log('The title of this blog post is "%s".', fullTitle);
  
// 	await browser.close();
//   }
// test('earth-and-blood-2020')
const init = async()=>{
	try {
		const browser = await puppeteer.launch(
		// 	{
		// 	executablePath: `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
		//   }
		  );
	const page = await browser.newPage();
     app(browser,page)	;
	} catch (error) {
		 console.log(error);
	}

}
init();