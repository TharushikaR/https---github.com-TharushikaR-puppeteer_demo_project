import * as puppeteer from 'puppeteer'

describe('RnD Device Test', () => {
	let browser, page, context
	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
			args: ['--start-maximized', '--incognito'],
		})
		context = await browser.createBrowserContext()
		page = await context.newPage()
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('Desktop Device Test', async function () {
		await page.setViewport({ width: 1920, height: 1080 })
		await page.goto('https://example.com/')
	})

	it('Tablet Device Test', async function () {
		const tablet = puppeteer.KnownDevices['iPad landscape']
		await page.emulate(tablet)
		await page.goto('https://example.com/')
	})

	it('Mobile Device Test', async function () {
		const mobile = puppeteer.KnownDevices['iPhone X']
		await page.emulate(mobile)
		await page.goto('https://example.com/')
	})
})
