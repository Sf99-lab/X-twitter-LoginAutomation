// const puppeteer = require('puppeteer');

// const url = 'https://twitter.com/'
// async function scrapeTwitterProfile(username) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     // Extracting basic profile info
//     const basicInfo = await page.evaluate(() => {
//         const element = document.querySelector("main div.css-175oi2r.r-1awozwy.r-18u37iz.r-dnmrzs div.css-1rynq56 span.css-1qaijid span.css-1qaijid"); // Adjust the selector as needed
// const text = element.textContent || element.innerText;
// console.log(text); // Output: "Learnk8s"
//         // Extract other basic info as needed
//         return { text };
//     });
//     console.log(basicInfo);
    
// }

// // Call the function to scrape Twitter profile
// scrapeTwitterProfile(url);


const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Launch a non-headless browser for visibility
  const page = await browser.newPage();

      // Increase navigation timeout
      await page.setDefaultNavigationTimeout(960000); // 60 seconds


try{ 
  // Navigate to Twitter login page
  await page.goto('https://twitter.com/login');

// Wait for login page to load
await page.waitForSelector('input[name="text"][autocomplete="username"]');


// Enter username and password
await page.type('input[name="text"][autocomplete="username"]', 'PASTE YOU USERNAME');
// Get all elements with the specified attributes
//var elements = document.querySelectorAll('div[role="button"][tabindex="0"][class*="css-"]');

  await page.evaluate(async () => {
    // Get all elements matching the common selector
    const elements = document.querySelectorAll('.css-175oi2r .css-1qaijid');

    // Loop through the elements to find the one with the desired innerText
    for (let element of elements) {
      if (element.innerText.trim() === 'Next') {
        // Simulate a click on the element
        element.click();
        console.log('click successfull');
        break; // Stop the loop once clicked
      }
    }
  });

      // Wait for password input field to be visible
      await page.waitForSelector('input[name="password"][autocomplete="current-password"]');

      // Enter password
      await page.type('input[name="password"][autocomplete="current-password"]', 'PASTE YOUR PASSWORD HERE');

          // Click on the login button
    await page.click('div[data-testid="LoginForm_Login_Button"]');

    //click for tweet
    await page.click('div[data-testid="tweetTextarea_0"]')

    } catch (err) {
      console.error('An error occurred:', err);
    } finally {
      // Close the browser
      //await browser.close();
    }

// await page.type('input[name="text"][autocomplete="current-password"]', 'fghfggffht');


//   // Click on the login button
//   await page.click('div[data-testid="LoginForm_Login_Button"]');

//   // Wait for the login to complete
//   await page.waitForNavigation();

  // // Post a tweet every 30 seconds
  // setInterval(async () => {
  //   // Navigate to the tweet compose page
  //   await page.goto('https://twitter.com/compose/tweet');

  //   // Wait for the tweet compose page to load
  //   await page.waitForSelector('div[aria-label="Tweet text"]');

  //   // Enter your tweet text
  //   await page.type('div[aria-label="Tweet text"]', 'This is a test tweet posted by Puppeteer!');

  //   // Click on the tweet button
  //   await page.click('div[data-testid="tweetButtonInline"]');

  //   console.log('Tweet posted successfully!');
  // }, 30000); // Repeat every 30 seconds

  // Keep the browser open (remove if you don't want to keep the browser open)
  // await browser.waitForTarget(() => false);

  // Close the browser when done
  // await browser.close();
})();
