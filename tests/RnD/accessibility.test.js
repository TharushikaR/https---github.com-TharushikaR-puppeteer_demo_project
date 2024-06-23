import puppeteer, { launch } from 'puppeteer'

(async () => {
   
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

   
	await page.goto('https://example.com/', { waitUntil: 'networkidle0' })
	await page.waitForSelector('h1')

    const snapshot=await page.accessibility.snapshot();
    console.log(snapshot);
    
	await browser.close()
})();
