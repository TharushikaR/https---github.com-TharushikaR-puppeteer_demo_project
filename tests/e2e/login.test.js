import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'
import * as commandName from '../../support/helpers.js'
import * as selectorName from '../../support/selectors.js'
import * as testData from '../../support/data.js'

describe('E2E Login Test', () => {
	let browser, page, context, ActualErrorMsgInvalidLogin, client
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
		page.goto(selectorName.baseURL)
	})

	afterEach(async function () {
		client = await page.target().createCDPSession()
		await client.send('Network.clearBrowserCookies')
		await client.send('Network.clearBrowserCache')
	})

	it.skip('Login Test - Invalid Credentials (Invalid Email/Valid Password)', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.typeElement(
			page,
			selectorName.txtEmail,
			testData.IncorrectEmail
		)
		await commandName.typeElement(
			page,
			selectorName.txtPswd,
			testData.correctPswd
		)
		await commandName.clickElement(page, selectorName.btnLogin)

		ActualErrorMsgInvalidLogin = await commandName.getTextFromElement(
			page,
			selectorName.labelInvalidLoginData
		)
		expect(ActualErrorMsgInvalidLogin).to.be.a(
			'string',
			testData.ExpectedErrorMsgInvalidLogin
		)
	})

	it.skip('Login Test - Invalid Credentials (Valid Email/Invalid Password)', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.typeElement(
			page,
			selectorName.txtEmail,
			testData.correctEmail
		)
		await commandName.typeElement(
			page,
			selectorName.txtPswd,
			testData.IncorrectPswd
		)
		await commandName.clickElement(page, selectorName.btnLogin)

		ActualErrorMsgInvalidLogin = await commandName.getTextFromElement(
			page,
			selectorName.labelInvalidLoginData
		)
		expect(ActualErrorMsgInvalidLogin).to.be.a(
			'string',
			testData.ExpectedErrorMsgInvalidLogin
		)
	})

	it.skip('Login Test - Invalid Credentials (Invalid Email/Invalid Password)', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.typeElement(
			page,
			selectorName.txtEmail,
			testData.IncorrectEmail
		)
		await commandName.typeElement(
			page,
			selectorName.txtPswd,
			testData.IncorrectPswd
		)
		await commandName.clickElement(page, selectorName.btnLogin)

		ActualErrorMsgInvalidLogin = await commandName.getTextFromElement(
			page,
			selectorName.labelInvalidLoginData
		)
		expect(ActualErrorMsgInvalidLogin).to.be.a(
			'string',
			testData.ExpectedErrorMsgInvalidLogin
		)
	})

	it.skip('Login Test - Valid Credentials (Valid Email/Valid Password)', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.typeElement(
			page,
			selectorName.txtEmail,
			testData.correctEmail
		)
		await commandName.typeElement(
			page,
			selectorName.txtPswd,
			testData.correctPswd
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
	})
})
