import puppeteer, { launch } from 'puppeteer'

(async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto('https://example.com/', { waitUntil: 'networkidle0' })
	await page.screenshot({ path: 'example.png', fullPage: true })
	await browser.close()
})();
