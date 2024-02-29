const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Launch a non-headless browser for visibility

    const page = await browser.newPage();
 

    try {
      await page.setDefaultNavigationTimeout(960000); // Increase navigation timeout
    // Navigate to Twitter login page
    await page.goto('https://twitter.com/login');

    // Wait for login page to load
    await page.waitForSelector('input[name="text"][autocomplete="username"]');


    // Enter username and password
    await page.type('input[name="text"][autocomplete="username"]', 'paste your username');
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
    await page.type('input[name="password"][autocomplete="current-password"]', 'paste your password');

    // Click on the login button
    await page.click('div[data-testid="LoginForm_Login_Button"]');

    //click for tweet
    await page.waitForSelector('div[data-testid="tweetTextarea_0"]');
    let count = 62;

        // Function to post a tweet
        const postTweet = async () => {
            await page.type('div[data-testid="tweetTextarea_0"]', `${count}: paste your tweet`); // Type your tweet content here

            await page.evaluate(() => {
                const button = document.querySelector('div[data-testid="tweetButtonInline"]');
                if (button) {
                    button.click();
                    console.log('Tweet posted successfully!');
                } else {
                    console.error('Button not found');
                }
            });
            count++;
        };

        // Post a tweet every 30 seconds
        setInterval(postTweet, 20000);

    } catch (err) {
        console.error('An error occurred:', err);
    }
})();

