import * as randomData from './randomData.js'

export const baseURL = 'https://practicesoftwaretesting.com/'
export const URLMyAccount = 'https://practicesoftwaretesting.com/#/account'
export const URLRegister = 'https://practicesoftwaretesting.com/#/auth/register'
export const URLLogin = 'https://practicesoftwaretesting.com/#/auth/login'
export const URLContact = 'https://practicesoftwaretesting.com/#/contact'

export const RegUFName = randomData.generateRandomFirstName()
export const RegULName = randomData.generateRandomLastName()
export const RegUDOB_1 = '12'
export const RegUDOB_2 = '11'
export const RegUDOB_3 = '1995'
export const RegUDOB_4 = '12'
export const RegUAdrs = 'Address'
export const RegUPostcode = '12345'
export const RegUCity = 'City'
export const RegUState = 'State'
export const RegUCountry = 'LK'
export const SubjectContact='customer-service'
export const RegUPhone = '1234567890'
export const correctEmail = randomData.generateRandomEmail()
export const correctPswd = 'Password#ABCD@123'
export const testContactMsg = 'Test Message using Puppeteer Automation. Test Message using Puppeteer Automation.'

export const adminEmail = `admin@practicesoftwaretesting.com`
export const adminPswd = 'welcome01'

export const IncorrectEmail = 'test123@gmail.com'
export const IncorrectPswd = 'Abc@123'

export const ExpectedErrorMsgInvalidLogin = 'Invalid email or password'
export const errorMsgFName = ` First name is required `
export const errorMsgLName = ` fields.last-name.required `
export const errorMsgDOB = ` Date of Birth is required `
export const errorMsgAdrs = ` Address is required `
export const errorMsgPCode = ` Postcode is required `
export const errorMsgCity = ` City is required `
export const errorMsgState = ` State is required `
export const errorMsgCountry = ` Country is required `
export const errorMsgPhone = ` Phone is required. `
export const errorMsgEmail = ` Email is required `
export const errorMsgPswd = ` Password is required `
export const successMsgContact = ` Thanks for your message! We will contact you shortly. `
