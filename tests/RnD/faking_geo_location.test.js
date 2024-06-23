import puppeteer, { launch } from 'puppeteer'

(async () => {
    //Faking Geo location
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

    //Grant permission for geo location change
    const context=browser.defaultBrowserContext();
    await context.overridePermissions('https://example.com/',['geolocation'])
	await page.goto('https://example.com/', { waitUntil: 'networkidle0' })
	await page.waitForSelector('h1')

    //change geolocation to the north pole
    await page.setGeolocation({latitude:90,longitude:0});
	await browser.close()
})();
