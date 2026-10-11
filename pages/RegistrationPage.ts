import { Page, Locator } from '@playwright/test';

// =====================================================
// ADDRESS INFORMATION INTERFACE
// =====================================================

export interface AddressInformation {
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

// =====================================================
// REGISTRATION PAGE CLASS
// =====================================================

export class RegistrationPage {

    readonly page: Page;

    // =====================================================
    // ACCOUNT INFORMATION LOCATORS
    // =====================================================

    readonly accountInformationHeading: Locator;

    readonly mrRadioButton: Locator;
    readonly mrsRadioButton: Locator;

    readonly passwordInput: Locator;

    readonly dayDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;

    readonly newsletterCheckbox: Locator;
    readonly specialOffersCheckbox: Locator;

    // =====================================================
    // ADDRESS INFORMATION LOCATORS
    // =====================================================

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;

    readonly addressInput: Locator;
    readonly address2Input: Locator;

    readonly countryDropdown: Locator;

    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;

    // =====================================================
    // CREATE ACCOUNT LOCATORS
    // =====================================================

    readonly createAccountButton: Locator;
    readonly accountCreatedHeading: Locator;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    constructor(page: Page) {

        this.page = page;

        // Account Information

        this.accountInformationHeading = page.getByText(
            'Enter Account Information',
            { exact: true }
        );

        this.mrRadioButton = page.locator('#id_gender1');

        this.mrsRadioButton = page.locator('#id_gender2');

        this.passwordInput = page.locator('#password');

        // Date of Birth

        this.dayDropdown = page.locator('#days');

        this.monthDropdown = page.locator('#months');

        this.yearDropdown = page.locator('#years');

        // Checkboxes

        this.newsletterCheckbox = page.locator('#newsletter');

        this.specialOffersCheckbox = page.locator('#optin');

        // Address Information

        this.firstNameInput = page.locator('#first_name');

        this.lastNameInput = page.locator('#last_name');

        this.companyInput = page.locator('#company');

        this.addressInput = page.locator('#address1');

        this.address2Input = page.locator('#address2');

        this.countryDropdown = page.locator('#country');

        this.stateInput = page.locator('#state');

        this.cityInput = page.locator('#city');

        this.zipcodeInput = page.locator('#zipcode');

        this.mobileNumberInput = page.locator('#mobile_number');

        // Create Account

        this.createAccountButton = page.locator(
            '[data-qa="create-account"]'
        );

        this.accountCreatedHeading = page.getByRole(
            'heading',
            {
                name: 'Account Created!',
                exact: true
            }
        );

        

        

    }

    // =====================================================
    // ACCOUNT INFORMATION METHODS
    // =====================================================

    async selectMr(): Promise<void> {

        await this.mrRadioButton.check();

    }

    async selectMrs(): Promise<void> {

        await this.mrsRadioButton.check();

    }

    async enterPassword(password: string): Promise<void> {

        await this.passwordInput.fill(password);

    }

    // =====================================================
    // DATE OF BIRTH METHODS
    // =====================================================

    async selectDay(day: string): Promise<void> {

        await this.dayDropdown.selectOption(day);

    }

    async selectMonth(month: string): Promise<void> {

        await this.monthDropdown.selectOption({
            label: month
        });

    }

    async selectYear(year: string): Promise<void> {

        await this.yearDropdown.selectOption(year);

    }

    // Reusable method to select complete Date of Birth

    async selectDateOfBirth(
        day: string,
        month: string,
        year: string
    ): Promise<void> {

        await this.selectDay(day);

        await this.selectMonth(month);

        await this.selectYear(year);

    }

    // =====================================================
    // CHECKBOX METHODS
    // =====================================================

    async selectNewsletter(): Promise<void> {

        await this.newsletterCheckbox.check();

    }

    async selectSpecialOffers(): Promise<void> {

        await this.specialOffersCheckbox.check();

    }

    // =====================================================
    // ADDRESS INFORMATION METHOD
    // =====================================================

    async fillAddressInformation(
        address: AddressInformation
    ): Promise<void> {

        await this.firstNameInput.fill(address.firstName);

        await this.lastNameInput.fill(address.lastName);

        if (address.company !== undefined) {

            await this.companyInput.fill(address.company);

        }

        await this.addressInput.fill(address.address);

        if (address.address2 !== undefined) {

            await this.address2Input.fill(address.address2);

        }

        await this.countryDropdown.selectOption({
            label: address.country
        });

        await this.stateInput.fill(address.state);

        await this.cityInput.fill(address.city);

        await this.zipcodeInput.fill(address.zipcode);

        await this.mobileNumberInput.fill(address.mobileNumber);

    }

    // =====================================================
    // CREATE ACCOUNT METHOD
    // =====================================================

    async clickCreateAccount(): Promise<void> {

        await this.createAccountButton.click();

    }

    async isPasswordRequiredValidationTriggered(): Promise<boolean> {

    return await this.passwordInput.evaluate(
        (element: HTMLInputElement) => {
            return element.validity.valueMissing;
        }
    );

}

async isRequiredFieldEmpty(
    selector: string
): Promise<boolean> {

    return await this.page.locator(selector).evaluate(
        (element: HTMLInputElement) => {
            return element.validity.valueMissing;
        }
    );

    

}

// =====================================================
// SELECT COUNTRY
// =====================================================

async selectCountry(country: string): Promise<void> {

    await this.countryDropdown.selectOption({
        label: country
    });

}

}