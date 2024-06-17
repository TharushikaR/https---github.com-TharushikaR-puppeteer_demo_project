export async function clickElement(page, selector) {
	try {
		await page.waitForSelector(selector, { timeout: 10000 })
		await page.click(selector)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		throw new Error(`cannot click selector: ${selector}`)
	}
}
export async function clickCheckbox(page, selector) {
	try {
		await page.waitForSelector(selector, { timeout: 10000, clickCount: 1 })
		await page.click(selector)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		throw new Error(`cannot click selector: ${selector}`)
	}
}
export async function selectElement(page, selector, option) {
	try {
		await page.waitForSelector(selector, { timeout: 10000 })
		await page.select(selector, option)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		throw new Error(`cannot select selector: ${selector}`)
	}
}
export async function typeElement(page, selector, textToType) {
	try {
		await page.waitForSelector(selector, { timeout: 10000 })
		await page.type(selector, textToType)
		await page.keyboard.press('Enter', { delay: 10 })
	} catch (error) {
		console.error(`Error: ${error.message}`)
		throw new Error(`cannot type on selector: ${selector}`)
	}
}
export async function getTextFromElement(page, selector) {
	try {
		await page.waitForSelector(selector, { timeout: 10000 })
		return await page.$eval(selector, element => element.innerHTML)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		throw new Error(`cannot extract text from selector: ${selector}`)
	}
}
export async function getCountFromElement(page, selector) {
	try {
		await page.waitForSelector(selector, { timeout: 10000 })
		return await page.$$eval(selector, element => element.length)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		throw new Error(`cannot get count from selector: ${selector}`)
	}
}
export async function waitForText(page, selector, text) {
	try {
		await page.waitForSelector(selector, { timeout: 10000 })
		await page.waitForFunction((selector, text) => {
			document.querySelector(selector).innerText.includes(text),
				{},
				selector,
				text
		})
	} catch (error) {
		console.error(`Error: ${error.message}`)
		throw new Error(`Text: ${text} not found for selector: ${selector}`)
	}
}
export async function shouldNotExist(page, selector) {
	try {
		//  await page.waitFor(()=>!document.querySelector(selector))
		await page.waitForSelector(selector, { hidden: true, timeout: 10000 })
	} catch (error) {
		console.error(`Error: ${error.message}`)
		throw new Error(`Selector: ${selector} is visible, But should not be.`)
	}
}
