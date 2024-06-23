import puppeteer, { launch } from 'puppeteer'



(async () => {
   
	const browser = await puppeteer.launch({headless:true});
    const context=await browser.createIncognitoBrowserContext()
	const page = await context.newPage();

   
	await page.goto('https://example.com/', { waitUntil: 'networkidle0' })
	await page.waitForSelector('h1')

    
	await browser.close()
})();
