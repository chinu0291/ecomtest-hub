import { Page, Locator , expect } from '@playwright/test';

export class SignupLoginPage {

    // =====================================
    // 1. DECLARE PROPERTIES
    // =====================================

    readonly page: Page;

    readonly nameInput: Locator;

    readonly emailInput: Locator;

    readonly signupButton: Locator;

    readonly existingEmailError: Locator;


    // =====================================
    // 2. CONSTRUCTOR
    // =====================================

    constructor(page: Page) {

        // Initialize browser page
        this.page = page;

        // Initialize Name locator
        this.nameInput = page.getByPlaceholder('Name', {
            exact: true
        });

        // Initialize Signup Email locator
        this.emailInput = page.locator('[data-qa="signup-email"]');

        // Initialize Signup button locator
        this.signupButton = page.getByRole('button', {
            name: 'Signup',
            exact: true
        });

        this.existingEmailError = page.getByText(
    'Email Address already exist!',
    { exact: true }
);

    }


    // =====================================
    // 3. ENTER NAME
    // =====================================

    async enterName(name: string): Promise<void> {

        await this.nameInput.fill(name);

    }


    // =====================================
    // 4. ENTER EMAIL
    // =====================================

    async enterEmail(email: string): Promise<void> {

        await this.emailInput.fill(email);

    }


    // =====================================
    // 5. CLICK SIGNUP
    // =====================================

    async clickSignup(): Promise<void> {

        await this.signupButton.click();

    }
    async verifyExistingEmailError(): Promise<void> {

    await expect(
        this.existingEmailError
    ).toBeVisible();

}


async isNameRequiredValidationTriggered(): Promise<boolean> {

    return await this.nameInput.evaluate(
        (element: HTMLInputElement) => {
            return element.validity.valueMissing;
        }
    );

    

}


async isEmailRequiredValidationTriggered(): Promise<boolean> {

    return await this.emailInput.evaluate(
        (element: HTMLInputElement) => {
            return element.validity.valueMissing;
        }
    );

}

async isEmailFormatInvalid(): Promise<boolean> {

    return await this.emailInput.evaluate(
        (element: HTMLInputElement) => {
            return element.validity.typeMismatch;
        }
    );

}

    

}


