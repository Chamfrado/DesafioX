// eslint-disable-next-line no-unused-vars
import { Builder, By, Key, until }  from "selenium-webdriver";

async function runTest() {
	// Set up WebDriver
	const driver = await new Builder().forBrowser("chrome").build();

	try {
		// Navigate to the Home page
		await driver.get("http://localhost:3000");

		// Find elements and perform actions
		const headingElement = await driver.findElement(By.tagName("h1"));
		const headingText = await headingElement.getText();
		console.log("Heading:", headingText);

		const buttonElement = await driver.findElement(By.tagName("button"));
		await buttonElement.click();

		// Wait for an element to appear
		await driver.wait(until.elementLocated(By.id("some-element")), 5000);

		// Perform assertions or further interactions
		// ...

	} finally {
		// Quit the WebDriver
		await driver.quit();
	}
}

runTest();