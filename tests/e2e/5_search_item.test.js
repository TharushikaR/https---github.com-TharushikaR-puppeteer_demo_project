import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'
import * as commandName from '../../support/helpers.js'
import * as selectorName from '../../support/selectors.js'
import * as testData from '../../support/data.js'

describe('E2E Search Items Test Cases', () => {
	let browser, page, context, client
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
		page.setViewport({ width: 1920, height: 1080 })
	})

	after(async function () {
		await browser.close()
	})

	beforeEach(async function () {
		page.goto(testData.baseURL)
	})

	afterEach(async function () {
		client = await page.target().createCDPSession()
		await client.send('Network.clearBrowserCookies')
		await client.send('Network.clearBrowserCache')
	})

	it('Search Item by Sort Method', async function () {})
    it('Search Item by Price Range Method', async function () {})
    it('Search Item by Search Box Method', async function () {})
    it('Search Item by Filters - Category Method', async function () {})
    it('Search Item by Filters - Brand Method', async function () {})
})
