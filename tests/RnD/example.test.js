import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'

describe('RnD Example Test', () => {
	let browser, page, context
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
		page.setDefaultNavigationTimeout(200000)
		page.setViewport({ width: 1920, height: 1080 })
	})

	after(async function () {
		await browser.close()
	})

	beforeEach(async function () {
		//Runs before each test steps
	})

	afterEach(async function () {
		//Runs after each test steps
	})

	it('should launch browser', async function () {
		await page.goto('https://example.com/')
		//await page.waitForTimeout(3000)
		await page.waitForSelector('h1')
		await page.reload()
		//await page.waitForTimeout(3000)
		await page.waitForSelector('h1')
	})

	it('Go back & forward in browser', async function () {
		await page.goto('https://example.com/')
		await page.waitForSelector('h1')
		await page.goto('https://dev.to/')
		await page.waitForSelector(".crayons-navigation__item[data-text='Top']")
		await page.goBack()
		await page.waitForSelector('h1')
		await page.goForward()
		await page.waitForSelector(".crayons-navigation__item[data-text='Top']")
	})

	it('Interacting with Inputs', async function () {
		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.type('#developer-name', 'Tharushi', { delay: 100 })
		//await page.waitForTimeout(1000)
		await page.click('#tried-test-cafe', { clickCount: 1 })
		//await page.waitForTimeout(1000)
		await page.select('#preferred-interface', 'JavaScript API')
		//await page.waitForTimeout(1000)
		const msg = 'Testing'
		await page.type('#comments', msg)
		//await page.waitForTimeout(1000)
		await page.click('#submit-button')
		await page.waitForSelector('.result-content')
		//await page.waitForTimeout(1000)
	})

	it('Get page title & URL', async function () {
		await page.goto('https://example.com/')
		const title = await page.title()
		const url = await page.url()
		console.log('Title: ' + title)
		console.log('URL: ' + url)
		const text = await page.$eval('h1', element => element.textContent)
		const count = await page.$$eval('p', element => element.length)
		console.log('H1: ' + text)
		console.log('P Tags: ' + count)
		//await page.waitForTimeout(3000)
	})

	it('Assertions', async function () {
		await page.goto('https://example.com/')
		const title = await page.title()
		const url = await page.url()
		const text = await page.$eval('h1', element => element.textContent)
		const count = await page.$$eval('p', element => element.length)

		expect(title).to.be.a('string', 'Example Domain')
		expect(url).to.include('example.com')
		expect(text).to.be.a('string', 'Example Domain')
		expect(count).to.equal(2)
	})

	it('Keyboard Press Simulation', async function () {
		await page.goto('http://zero.webappsecurity.com/')
		await page.waitForSelector('#searchTerm')
		await page.type('#searchTerm', 'Hello')
		await page.keyboard.press('Enter', { delay: 100 })
		//await page.waitForTimeout(5000)
	})

	it('xpath-NOT WORKING', async function () {
		await page.goto('https://example.com/')
		//await page.waitForTimeout(3000)
		//await page.waitForXPath('//h1')
		// await page.reload()
		//await page.waitForTimeout(3000)
		await page.waitForSelector('h1')
	})

	it('Element not exist', async function () {
		await page.goto('http://zero.webappsecurity.com/login.html')
		await page.waitForSelector("input[value='Sign in']")
		await page.click("input[value='Sign in']")
		// await page.waitForTimeout(
		// 	() => !document.querySelector("input[value='Sign in']")
		// )
		await page.waitForSelector("input[value='Sign in']", {
			hidden: true,
			timeout: 20000,
		})
	})
})
