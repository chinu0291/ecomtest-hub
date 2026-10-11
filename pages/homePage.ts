import { Page , Locator } from '@playwright/test';

export class HomePage{

    //Declare Properties

    readonly page: Page;

    readonly signUpLoginLink: Locator;


    //Constructor

    constructor(page: Page) {

      // Store the playwright  browser page  

this.page = page;

        // Initialize Signup / Login navbar locator


this.signUpLoginLink =page.getByRole('link' , {

        name: ' Signup / Login'
    });
    }
    //Open Homepage

    async open(): Promise<void> {

    await this.page.goto('/', {
        waitUntil: 'commit',
        timeout: 45000
    });

    await this.signUpLoginLink.waitFor({
        state: 'visible',
        timeout: 15000
    });
}


    // Click Sign Up / Login

    async clickSignupLogin(): Promise<void> {
        await this.signUpLoginLink.click();
    
    }

    
}