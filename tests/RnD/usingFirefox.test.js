import puppeteer, { launch } from 'puppeteer-firefox'

//NOW CANNOT USE

(async () => {
   
	const browser = await puppeteer.launch({headless:true});
	const page = await browser.newPage();

   
	await page.goto('https://example.com/', { waitUntil: 'networkidle0' })
	await page.waitForSelector('h1')

    
	await browser.close()
})();
