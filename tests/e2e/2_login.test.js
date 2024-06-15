import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'
import * as commandName from '../../support/helpers.js'
import * as selectorName from '../../support/selectors.js'
import * as testData from '../../support/data.js'

describe('E2E Login Test Cases', () => {
	let browser, page, context, ActualErrorMsgInvalidLogin, client, errorMsg
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

	it('Login - Invalid Credentials (Invalid Email/Valid Password)', async function () {
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

	it('Login - Invalid Credentials (Valid Email/Invalid Password)', async function () {
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

	it('Login - Invalid Credentials (Invalid Email/Invalid Password)', async function () {
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

	it('Login - Valid Credentials (Valid Email/Valid Password)', async function () {
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
	})

	it('Login - Both Fields are Empty', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.clickElement(page, selectorName.btnLogin)

		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationEmptyUsername
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgEmail)

		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationEmptyPswd
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgPswd)
	})

	it('Login - Only Password Field Empty', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.typeElement(
			page,
			selectorName.txtEmail,
			testData.adminEmail
		)

		await commandName.clickElement(page, selectorName.btnLogin)

		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationEmptyPswd
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgPswd)
	})

	it('Login - Only Username Field Empty', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.typeElement(
			page,
			selectorName.txtPswd,
			testData.adminPswd
		)
		await commandName.clickElement(page, selectorName.btnLogin)

		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationEmptyUsername
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgEmail)
	})
})
