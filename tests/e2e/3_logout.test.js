import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'
import * as commandName from '../../support/helpers.js'
import * as selectorName from '../../support/selectors.js'
import * as testData from '../../support/data.js'

describe('E2E Logout Test Cases', () => {
	let browser, page, context, client
	before(async function () {
		browser = await puppeteer.launch({
			headless: true,
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

	it('Logout Only', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.typeElement(
			page,
			selectorName.txtEmail,
			testData.adminEmail
		)
		await commandName.typeElement(
			page,
			selectorName.txtPswd,
			testData.adminPswd
		)
		await commandName.clickElement(page, selectorName.btnLogin)

		const titlePage = await page.title()
		const urlPage = await page.url()
		const textPageHeader = await commandName.getTextFromElement(
			page,
			selectorName.textHeaderMyAccount
		)
		expect(titlePage).to.be.a('string', textPageHeader)
		expect(urlPage).to.be.a('string', testData.URLMyAccount)

		await commandName.clickElement(page, selectorName.UserPanelDropDown)
		await commandName.clickElement(page, selectorName.linkSignOut)

		const titlePageLogin = await page.title()
		const urlPageLogin = await page.url()
		const textPageHeaderLogin = await commandName.getTextFromElement(
			page,
			selectorName.textHeaderLogin
		)
		expect(titlePageLogin).to.be.a('string', textPageHeaderLogin)
		expect(urlPageLogin).to.be.a('string', testData.URLLogin)
	})
})
