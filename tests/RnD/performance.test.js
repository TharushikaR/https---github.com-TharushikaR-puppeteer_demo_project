import puppeteer, { launch } from 'puppeteer'

(async () => {
   
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

   
	await page.goto('https://example.com/', { waitUntil: 'networkidle0' })
	await page.waitForSelector('h1')

    //Execute navigation API within the page context
    const metrics=await page.evaluate(()=>JSON.stringify(window.performance));
    console.log(JSON.parse(metrics));
    
	await browser.close()
})();
