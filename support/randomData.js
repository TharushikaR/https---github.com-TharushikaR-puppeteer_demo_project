// Array of common first names
const firstNames = ["John","Simon","Michael","Lucz","William","Olive","James","Avon"];

// Function to generate a random first name
export function generateRandomFirstName() {
  const randomIndex = Math.floor(Math.random() * firstNames.length);
  return firstNames[randomIndex];
}

//--------------------------------------------------------------------------------------------------

// Array of common last names for males
const lastNames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis"];

// Function to generate a random last name
export function generateRandomLastName() {
  const randomIndex = Math.floor(Math.random() * lastNames.length);
  return lastNames[randomIndex];
}

//--------------------------------------------------------------------------------------------------

//Generate random string for generateRandomEmail() function
export function generateRandomString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  //generate random email
  export function generateRandomEmail() {
    const usernameLength = Math.floor(Math.random() * 10) + 5; // Random username length between 5 and 14 characters
    const domainLength = Math.floor(Math.random() * 5) + 5; // Random domain length between 5 and 9 characters
  
    const username = generateRandomString(usernameLength);
    const domain = generateRandomString(domainLength);
    const topLevelDomains = ["com", "net", "org", "edu", "gov"]; // List of common top-level domains
    const topLevelDomain =
      topLevelDomains[Math.floor(Math.random() * topLevelDomains.length)];
  
    return `${username}@${domain}.${topLevelDomain}`;
  }
  
  //--------------------------------------------------------------------------------------------------
