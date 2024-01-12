const express = require('express')
const cors = require('cors')
const appExpress = express();
const generate = async(browser,page,title,year)=>{
    // Navigate the page to a URL
	await page.goto(`https://weciimaa.online/watch/%d9%85%d8%b4%d8%a7%d9%87%d8%af%d8%a9-%d9%81%d9%8a%d9%84%d9%85-${title}-${year}-%d9%85%d8%aa%d8%b1%d8%ac%d9%85/`);
   
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
const app = (browser,page)=>{
    appExpress.use(express.json());
appExpress.use(express.urlencoded({ extended: false }))
appExpress.use(cors());
    appExpress.post('/get-links',async(req,res)=>{
        const {name,year} = req.body
        const correctName = name.replace(/[^a-zA-Z0-9: ]/g, "").split(' ').join('-')
        
        try {
            const data = await generate(browser,page,correctName,year)
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