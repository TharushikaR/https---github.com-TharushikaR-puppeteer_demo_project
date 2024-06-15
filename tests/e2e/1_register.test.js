import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'
import * as commandName from '../../support/helpers.js'
import * as selectorName from '../../support/selectors.js'
import * as testData from '../../support/data.js'

describe('E2E Register Test Cases', () => {
	let browser, page, context, client, errorMsg

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
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

	it('Registration - Fields Error Validation', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.clickElement(page, selectorName.linkRegister)
		await commandName.clickElement(page, selectorName.btnRegister)

		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationFName
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgFName)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationLName
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgLName)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationDOB
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgDOB)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationAdrs
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgAdrs)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationPCode
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgPCode)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationCity
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgCity)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationState
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgState)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationCountry
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgCountry)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationPhone
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgPhone)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationEmail
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgEmail)
		errorMsg = await commandName.getTextFromElement(
			page,
			selectorName.errorValidationPswd
		)
		expect(errorMsg).to.be.a('string', testData.errorMsgPswd)
	})

	it('Registration - Register A User Successfully', async function () {
		await commandName.clickElement(page, selectorName.linkSignIn)
		await commandName.clickElement(page, selectorName.linkRegister)

		const titlePageReg = await page.title()
		const urlPageReg = await page.url()
		const textPageHeaderReg = await commandName.getTextFromElement(
			page,
			selectorName.textHeaderRegister
		)
		expect(titlePageReg).to.be.a('string', textPageHeaderReg)
		expect(urlPageReg).to.be.a('string', testData.URLRegister)

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
		//await commandName.typeElement(page,selectorName.UserDOB,testData.RegUDOB)

		await page.focus(selectorName.UserDOB)
		await commandName.typeElement(
			page,
			selectorName.UserDOB,
			testData.RegUDOB_1
		)
		await page.keyboard.press('Tab')
		await commandName.typeElement(
			page,
			selectorName.UserDOB,
			testData.RegUDOB_2
		)
		await page.keyboard.press('Tab')
		await commandName.typeElement(
			page,
			selectorName.UserDOB,
			testData.RegUDOB_3
		)
		await page.keyboard.press('Tab')
		await commandName.typeElement(
			page,
			selectorName.UserDOB,
			testData.RegUDOB_3
		)
		await page.keyboard.press('Enter')
		// await page.keyboard.type(testData.RegUDOB)
		// await page.keyboard.press('Enter')

		//await commandName.clickElement(page,selectorName.UserDOB)

		await commandName.typeElement(
			page,
			selectorName.UserAddress,
			testData.RegUAdrs
		)
		await commandName.typeElement(
			page,
			selectorName.UserPostcode,
			testData.RegUPostcode
		)
		await commandName.typeElement(
			page,
			selectorName.UserCity,
			testData.RegUCity
		)
		await commandName.typeElement(
			page,
			selectorName.UserState,
			testData.RegUState
		)
		await commandName.selectElement(
			page,
			selectorName.UserCountry,
			testData.RegUCountry
		)
		await commandName.typeElement(
			page,
			selectorName.UserPhone,
			testData.RegUPhone
		)
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

		await commandName.clickElement(page, selectorName.btnRegister)

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
