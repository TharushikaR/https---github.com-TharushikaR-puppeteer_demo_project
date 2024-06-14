import puppeteer, { launch } from 'puppeteer'
import { expect } from 'chai'
import {
	clickElement,
	getCountFromElement,
	getTextFromElement,
	shouldNotExist,
} from '../../lib/helpers.js'

describe('RnD Example - Custom Command Test', () => {
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

	it('Count element tags', async function () {
		await page.goto('https://example.com/')
		const title = await page.title()
		const url = await page.url()
		console.log('Title: ' + title)
		console.log('URL: ' + url)
		const text = await getTextFromElement(page, 'h1')
		const count = await getCountFromElement(page, 'p')
		console.log('H1: ' + text)
		console.log('P Tags: ' + count)
	})

	it('Assertions', async function () {
		await page.goto('https://example.com/')
		const title = await page.title()
		const url = await page.url()
		const text = await getTextFromElement(page, 'h1')
		const count = await getCountFromElement(page, 'p')

		expect(title).to.be.a('string', 'Example Domain')
		expect(url).to.include('example.com')
		expect(text).to.be.a('string', 'Example Domain')
		expect(count).to.equal(2)
	})

	it('Element not exist', async function () {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await clickElement(page, '#signin_button')
		await shouldNotExist(page, '#signin_button')
	})
})
