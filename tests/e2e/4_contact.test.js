import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'
import * as commandName from '../../support/helpers.js'
import * as selectorName from '../../support/selectors.js'
import * as testData from '../../support/data.js'

describe('E2E Contact Form Test Cases', () => {
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

	it('Fill Contact Form', async function () {
		await commandName.clickElement(page, selectorName.linkContact)

		const titlePageContact = await page.title()
		const urlPageContact = await page.url()
		const textPageHeaderContact = await commandName.getTextFromElement(
			page,
			selectorName.textHeaderContact
		)
		expect(titlePageContact).to.be.a('string', textPageHeaderContact)
		expect(urlPageContact).to.be.a('string', testData.URLContact)

		await commandName.typeElement(
			page,
			selectorName.UserFName,
			testData.RegUFName
		)
		await commandName.typeElement(
			page,
			selectorName.UserLName,
			testData.RegULName
		)

		await commandName.typeElement(
			page,
			selectorName.txtEmail,
			testData.correctEmail
		)

		await commandName.selectElement(
			page,
			selectorName.SubjectDropDown,
			testData.SubjectContact
		)

		await commandName.typeElement(
			page,
			selectorName.txtMsgBox,
			testData.testContactMsg
		)

		await commandName.clickElement(page, selectorName.btnContactSend)

		const sucessContactMsg = await commandName.getTextFromElement(
			page,
			selectorName.successMsgContactSent
		)
		expect(sucessContactMsg).to.be.a('string', testData.successMsgContact)
	})
})
