import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'
import * as commandName from '../../support/helpers.js'
import * as selectorName from '../../support/selectors.js'
import * as testData from '../../support/data.js'

describe('E2E Search Items Test Cases', () => {
	let browser, page, context, client
	before(async function () {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 20,
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

	it('Search Item by Search Box Method', async function () {
		await commandName.typeElement(
			page,
			selectorName.searchBox,
			testData.nameSearchItem
		)

		await commandName.clickElement(page, selectorName.searchBtn)
		const labelItem1 = await commandName.getTextFromElement(
			page,
			selectorName.lblItem1
		)
		expect(labelItem1).to.be.a('string', testData.lblItemName1)
	})
	it.skip('Search Item by Filters - Category Method', async function () {
		await commandName.clickCheckbox(page, selectorName.chkboxCategory)

		const labelItem2 = await commandName.getTextFromElement(
			page,
			selectorName.lblItem2
		)
		expect(labelItem2).to.be.a('string', testData.lblItemName2)
	})
})
