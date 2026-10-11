import { test, expect, type Page } from '@playwright/test';

// =====================================================
// IMPORT PAGE OBJECT CLASSES
// =====================================================

import { HomePage } from '../../pages/homePage';

import { SignupLoginPage } from '../../pages/SignUpLoginPage';

import { RegistrationPage } from '../../pages/RegistrationPage';

// =====================================================
// IMPORT TEST DATA
// =====================================================

import { registrationData , mandatoryAddressFields , registrationWithoutOptionalFields , dateOfBirthTestData , countryDropdownTestData } from '../../test-data/registrationData';



// =====================================================
// REGISTRATION AUTOMATION TEST SUITE
// =====================================================

test.describe('ECQA-4 - Registration Automation', () => {

    // =====================================================
    // TC_REG_001 - SIGNUP / LOGIN NAVIGATION
    // =====================================================

    test(
        'TC_REG_001 - Verify Signup/Login navigation',
        async ({ page }) => {

            // Initialize Home Page

            const homePage = new HomePage(page);

            // Step 1: Open homepage

            await homePage.open();

            // Step 2: Click Signup/Login

            await homePage.clickSignupLogin();

            // Step 3: Verify navigation to login page

            await expect(page).toHaveURL(/\/login\/?$/);

            // Step 4: Verify New User Signup heading

            await expect(
                page.getByText('New User Signup!', {
                    exact: true
                })
            ).toBeVisible();

        }
    );

    // =====================================================
    // TC_REG_002 - ACCOUNT INFORMATION NAVIGATION
    // =====================================================

    test(
        'TC_REG_002 - Verify navigation to Account Information',
        async ({ page }) => {

            // Initialize Page Objects

            const homePage = new HomePage(page);

            const signupLoginPage = new SignupLoginPage(page);

            const registrationPage = new RegistrationPage(page);

            // Step 1: Open homepage

            await homePage.open();

            // Step 2: Click Signup/Login

            await homePage.clickSignupLogin();

            // Step 3: Enter name

            await signupLoginPage.enterName(
                registrationData.validName
            );

            // Step 4: Generate unique email

            const uniqueEmail =
                `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

            // Step 5: Enter email

            await signupLoginPage.enterEmail(uniqueEmail);

            // Step 6: Click Signup

            await signupLoginPage.clickSignup();

            // Step 7: Verify Account Information heading

            await expect(
                registrationPage.accountInformationHeading
            ).toBeVisible();

        }
    );

    // =====================================================
    // TC_REG_003 - SUCCESSFUL ACCOUNT REGISTRATION
    // =====================================================

    test(
        'TC_REG_003 - Verify successful account registration',
        async ({ page }) => {

            // =================================================
            // INITIALIZE PAGE OBJECTS
            // =================================================

            const homePage = new HomePage(page);

            const signupLoginPage = new SignupLoginPage(page);

            const registrationPage = new RegistrationPage(page);

            // =================================================
            // STEP 1 - OPEN HOMEPAGE
            // =================================================

            await homePage.open();

            // Verify homepage is displayed

            await expect(page).toHaveURL(/automationexercise\.com\/?$/);

            // =================================================
            // STEP 2 - NAVIGATE TO SIGNUP / LOGIN
            // =================================================

            await homePage.clickSignupLogin();

            await expect(page).toHaveURL(/\/login\/?$/);

            // =================================================
            // STEP 3 - ENTER NAME AND EMAIL
            // =================================================

            await signupLoginPage.enterName(
                registrationData.validName
            );

            // Generate a unique email for this registration

            const uniqueEmail =
                `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

            await signupLoginPage.enterEmail(uniqueEmail);

            // =================================================
            // STEP 4 - CLICK SIGNUP
            // =================================================

            await signupLoginPage.clickSignup();

            // =================================================
            // STEP 5 - VERIFY ACCOUNT INFORMATION
            // =================================================

            await expect(
                registrationPage.accountInformationHeading
            ).toBeVisible();

            // =================================================
            // STEP 6 - SELECT TITLE
            // =================================================

            await registrationPage.selectMr();

            await expect(
                registrationPage.mrRadioButton
            ).toBeChecked();

            // =================================================
            // STEP 7 - ENTER PASSWORD
            // =================================================

            await registrationPage.enterPassword(
                registrationData.password
            );

            await expect(
                registrationPage.passwordInput
            ).toHaveValue(registrationData.password);

            // =================================================
            // STEP 8 - SELECT DATE OF BIRTH
            // =================================================

            await registrationPage.selectDateOfBirth(
                registrationData.dateOfBirth.day,
                registrationData.dateOfBirth.month,
                registrationData.dateOfBirth.year
            );

            // Verify selected day

            await expect(
                registrationPage.dayDropdown
            ).toHaveValue(registrationData.dateOfBirth.day);

            // Verify selected month by visible label

            await expect(
                registrationPage.monthDropdown.locator(
                    'option:checked'
                )
            ).toHaveText(registrationData.dateOfBirth.month);

            // Verify selected year

            await expect(
                registrationPage.yearDropdown
            ).toHaveValue(registrationData.dateOfBirth.year);

            // =================================================
            // STEP 9 - SELECT CHECKBOXES
            // =================================================

            await registrationPage.selectNewsletter();

            await registrationPage.selectSpecialOffers();

            // Verify newsletter checkbox

            await expect(
                registrationPage.newsletterCheckbox
            ).toBeChecked();

            // Verify special offers checkbox

            await expect(
                registrationPage.specialOffersCheckbox
            ).toBeChecked();

            // =================================================
            // STEP 10 - FILL ADDRESS INFORMATION
            // =================================================

            await registrationPage.fillAddressInformation(
                registrationData.address
            );

            // Verify First Name

            await expect(
                registrationPage.firstNameInput
            ).toHaveValue(
                registrationData.address.firstName
            );

            // Verify Last Name

            await expect(
                registrationPage.lastNameInput
            ).toHaveValue(
                registrationData.address.lastName
            );

            // Verify Country

            await expect(
                registrationPage.countryDropdown.locator(
                    'option:checked'
                )
            ).toHaveText(
                registrationData.address.country
            );

            // =================================================
            // STEP 11 - CLICK CREATE ACCOUNT
            // =================================================

            await registrationPage.clickCreateAccount();

            // =================================================
            // STEP 12 - VERIFY ACCOUNT CREATION
            // =================================================

            await expect(
                registrationPage.accountCreatedHeading
            ).toBeVisible();

        }
    );

    // =====================================================
// TC_REG_004 - REGISTRATION WITH EXISTING EMAIL
// =====================================================

test(
    'TC_REG_004 - Verify registration with existing email',
    async ({ page }) => {

        // Step 1: Initialize Page Objects

        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        // Step 2: Open homepage

        await homePage.open();

        // Step 3: Click Signup/Login

        await homePage.clickSignupLogin();

        // Step 4: Verify Signup section

        await expect(
            page.getByText('New User Signup!', {
                exact: true
            })
        ).toBeVisible();

        // Step 5: Enter name

        await signupLoginPage.enterName(
            registrationData.validName
        );

        // Step 6: Enter an already registered email

        await signupLoginPage.enterEmail(
            registrationData.existingEmail
        );

        // Step 7: Click Signup

        await signupLoginPage.clickSignup();

        // Step 8: Verify duplicate email error

        await expect(
            signupLoginPage.existingEmailError
        ).toBeVisible();

        // Step 9: Verify user remains on Signup/Login page

        await expect(page).toHaveURL(/\/signup\/?$/);

    }
);

// =====================================================
// TC_REG_005 - REGISTRATION WITH EMPTY NAME
// =====================================================

test(
    'TC_REG_005 - Verify registration with empty name',
    async ({ page }) => {

        // Step 1: Initialize Page Objects
        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        // Step 2: Open homepage
        await homePage.open();

        // Step 3: Click Signup/Login
        await homePage.clickSignupLogin();

        // Step 4: Verify New User Signup section
        await expect(
            page.getByText('New User Signup!', {
                exact: true
            })
        ).toBeVisible();

        // Step 5: Leave Name field empty
        await signupLoginPage.enterName('');

        // Step 6: Generate a valid email
        const uniqueEmail =
            `qa${Date.now()}@example.com`;

        // Step 7: Enter Email
        await signupLoginPage.enterEmail(uniqueEmail);

        // Step 8: Click Signup
        await signupLoginPage.clickSignup();

        // Step 9: Verify required-field validation
        const isValidationTriggered =
            await signupLoginPage.isNameRequiredValidationTriggered();

        expect(isValidationTriggered).toBe(true);

        // Step 10: Verify user remains on Signup/Login page
        await expect(page).toHaveURL(/\/login\/?$/);

        // Step 11: Verify Account Information is not displayed
        await expect(
            page.getByText('Enter Account Information', {
                exact: true
            })
        ).not.toBeVisible();

    }
);

// =====================================================
// TC_REG_006 - REGISTRATION WITH EMPTY EMAIL
// =====================================================

test(
    'TC_REG_006 - Verify registration with empty email',
    async ({ page }) => {

        // Step 1: Initialize Page Objects

        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        // Step 2: Open homepage

        await homePage.open();

        // Step 3: Navigate to Signup/Login

        await homePage.clickSignupLogin();

        // Step 4: Verify New User Signup section

        await expect(
            page.getByText('New User Signup!', {
                exact: true
            })
        ).toBeVisible();

        // Step 5: Enter a valid name

        await signupLoginPage.enterName(
            registrationData.validName
        );

        // Step 6: Leave email field empty

        await signupLoginPage.enterEmail('');

        // Step 7: Click Signup

        await signupLoginPage.clickSignup();

        // Step 8: Verify email required validation

        const isEmailValidationTriggered =
            await signupLoginPage.isEmailRequiredValidationTriggered();

        expect(isEmailValidationTriggered).toBe(true);

        // Step 9: Verify user remains on Signup/Login page

        await expect(page).toHaveURL(/\/login\/?$/);

        // Step 10: Verify Account Information is not displayed

        await expect(
            page.getByText('Enter Account Information', {
                exact: true
            })
        ).not.toBeVisible();

    }
);
// =====================================================
// TC_REG_007 - REGISTRATION WITH INVALID EMAIL FORMAT
// =====================================================

test(
    'TC_REG_007 - Verify registration with invalid email format',
    async ({ page }) => {

        // Step 1: Initialize Page Objects
        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        // Step 2: Open Homepage
        await homePage.open();

        // Step 3: Navigate to Signup/Login
        await homePage.clickSignupLogin();

        // Step 4: Verify New User Signup section
        await expect(
            page.getByText('New User Signup!', {
                exact: true
            })
        ).toBeVisible();

        // Step 5: Enter valid name
        await signupLoginPage.enterName(
            registrationData.validName
        );

        // Step 6: Enter invalid email format
        const invalidEmail = 'rahulgmail.com';

        await signupLoginPage.enterEmail(invalidEmail);

        // Step 7: Click Signup
        await signupLoginPage.clickSignup();

        // Step 8: Verify invalid email format
        const isInvalidEmail =
            await signupLoginPage.isEmailFormatInvalid();

        expect(isInvalidEmail).toBe(true);

        // Step 9: Verify user remains on Signup/Login page
        await expect(page).toHaveURL(/\/login\/?$/);

        // Step 10: Verify Account Information is not displayed
        await expect(
            page.getByText('Enter Account Information', {
                exact: true
            })
        ).not.toBeVisible();

    }
);
// =====================================================
// TC_REG_008 - REGISTRATION WITH EMPTY PASSWORD
// =====================================================

test(
    'TC_REG_008 - Verify registration with empty password',
    async ({ page }) => {

        // Step 1: Initialize Page Objects

        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        const registrationPage = new RegistrationPage(page);

        // Step 2: Open homepage

        await homePage.open();

        // Step 3: Click Signup/Login

        await homePage.clickSignupLogin();

        // Step 4: Verify New User Signup section

        await expect(
            page.getByText('New User Signup!', {
                exact: true
            })
        ).toBeVisible();

        // Step 5: Enter valid name

        await signupLoginPage.enterName(
            registrationData.validName
        );

        // Step 6: Generate unique email

        const uniqueEmail =
            `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

        // Step 7: Enter email

        await signupLoginPage.enterEmail(uniqueEmail);

        // Step 8: Click Signup

        await signupLoginPage.clickSignup();

        // Step 9: Verify Account Information page

        await expect(
            page.getByText('Enter Account Information', {
                exact: true
            })
        ).toBeVisible();

        // Step 10: Select title

        await registrationPage.selectMr();

        // Step 11: Leave password empty

        await registrationPage.enterPassword('');

        // Step 12: Select Date of Birth

        await registrationPage.selectDateOfBirth(
            registrationData.dateOfBirth.day,
            registrationData.dateOfBirth.month,
            registrationData.dateOfBirth.year
        );

        // Step 13: Fill address information

        await registrationPage.fillAddressInformation(
            registrationData.address
        );

        // Step 14: Click Create Account

        await registrationPage.clickCreateAccount();

        // Step 15: Verify password required validation

        const isPasswordValidationTriggered =
            await registrationPage.isPasswordRequiredValidationTriggered();

        expect(isPasswordValidationTriggered).toBe(true);

        // Step 16: Verify Account Created message is absent

        await expect(
            registrationPage.accountCreatedHeading
        ).not.toBeVisible();

        // Step 17: Verify user remains on registration page

        await expect(page).toHaveURL(/\/signup\/?$/);

    }
);

// =====================================================
// TC_REG_009 - MANDATORY ADDRESS FIELD VALIDATION
// =====================================================

for (const field of mandatoryAddressFields) {

    test(
        `TC_REG_009 - Verify empty ${field.fieldName}`,
        async ({ page }) => {

            // Step 1: Initialize Page Objects
            const homePage = new HomePage(page);

            const signupLoginPage = new SignupLoginPage(page);

            const registrationPage = new RegistrationPage(page);

            // Step 2: Open homepage
            await homePage.open();

            // Step 3: Navigate to Signup/Login
            await homePage.clickSignupLogin();

            // Step 4: Enter valid name
            await signupLoginPage.enterName(
                registrationData.validName
            );

            // Step 5: Generate unique email
            const uniqueEmail =
                `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

            // Step 6: Enter email
            await signupLoginPage.enterEmail(uniqueEmail);

            // Step 7: Click Signup
            await signupLoginPage.clickSignup();

            // Step 8: Verify Account Information page
            await expect(
                page.getByText('Enter Account Information', {
                    exact: true
                })
            ).toBeVisible();

            // Step 9: Select title
            await registrationPage.selectMr();

            // Step 10: Enter password
            await registrationPage.enterPassword(
                registrationData.password
            );

            // Step 11: Fill all address fields
            await registrationPage.fillAddressInformation(
                registrationData.address
            );

            // Step 12: Clear only the field being tested
            await page.locator(field.selector).fill('');

            // Step 13: Verify the field is empty
            await expect(
                page.locator(field.selector)
            ).toBeEmpty();

            // Step 14: Click Create Account
            await registrationPage.clickCreateAccount();

            // Step 15: Verify required-field validation
            const isValidationTriggered =
                await registrationPage.isRequiredFieldEmpty(
                    field.selector
                );

            expect(isValidationTriggered).toBe(true);

            // Step 16: Verify account was not created
            await expect(
                registrationPage.accountCreatedHeading
            ).not.toBeVisible();

            // Step 17: Verify user remains on registration page
            await expect(page).toHaveURL(/\/signup\/?$/);

        }
);


} // End TC_REG_009 data-driven loop

    // =====================================================
// TC_REG_010 - REGISTRATION WITHOUT OPTIONAL FIELDS
// =====================================================

test(
    'TC_REG_010 - Verify registration without optional fields',
    async ({ page }) => {

        // Step 1: Initialize Page Objects

        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        const registrationPage = new RegistrationPage(page);

        // Step 2: Open homepage

        await homePage.open();

        // Step 3: Navigate to Signup/Login

        await homePage.clickSignupLogin();

        // Step 4: Verify New User Signup section

        await expect(
            page.getByText('New User Signup!', {
                exact: true
            })
        ).toBeVisible();

        // Step 5: Enter valid name

        await signupLoginPage.enterName(
            registrationData.validName
        );

        // Step 6: Generate unique email

        const uniqueEmail =
            `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

        // Step 7: Enter email

        await signupLoginPage.enterEmail(uniqueEmail);

        // Step 8: Click Signup

        await signupLoginPage.clickSignup();

        // Step 9: Verify Account Information page

        await expect(
            page.getByText('Enter Account Information', {
                exact: true
            })
        ).toBeVisible();

        // Step 10: Select title

        await registrationPage.selectMr();

        // Step 11: Enter password

        await registrationPage.enterPassword(
            registrationData.password
        );

        // Step 12: Select Date of Birth

        await registrationPage.selectDateOfBirth(
            registrationData.dateOfBirth.day,
            registrationData.dateOfBirth.month,
            registrationData.dateOfBirth.year
        );

        // Step 13: Fill mandatory address information

        await registrationPage.fillAddressInformation(
            registrationWithoutOptionalFields
        );

        // Step 14: Verify Company field is empty

        await expect(
            page.locator('#company')
        ).toHaveValue('');

        // Step 15: Verify Address 2 field is empty

        await expect(
            page.locator('#address2')
        ).toHaveValue('');

        // Step 16: Click Create Account

        await registrationPage.clickCreateAccount();

        // Step 17: Verify successful registration

        await expect(
            registrationPage.accountCreatedHeading
        ).toBeVisible();

        // Step 18: Verify success URL

        await expect(page).toHaveURL(/\/account_created\/?$/);

    }
);
// =====================================================
// TC_REG_011 - NEWSLETTER AND SPECIAL OFFERS CHECKBOX
// =====================================================

test(
    'TC_REG_011 - Verify Newsletter and Special Offers checkbox functionality',
    async ({ page }) => {

        // Step 1: Initialize Page Objects

        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        const registrationPage = new RegistrationPage(page);

        // Step 2: Open homepage

        await homePage.open();

        // Step 3: Navigate to Signup/Login

        await homePage.clickSignupLogin();

        // Step 4: Enter valid name

        await signupLoginPage.enterName(
            registrationData.validName
        );

        // Step 5: Generate unique email

        const uniqueEmail =
            `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

        // Step 6: Enter email

        await signupLoginPage.enterEmail(uniqueEmail);

        // Step 7: Click Signup

        await signupLoginPage.clickSignup();

        // Step 8: Verify Account Information page

        await expect(
            registrationPage.accountInformationHeading
        ).toBeVisible();

        // =====================================================
        // NEWSLETTER CHECKBOX VALIDATION
        // =====================================================

        // Step 9: Verify Newsletter checkbox is unchecked

        await expect(
            registrationPage.newsletterCheckbox
        ).not.toBeChecked();

        // Step 10: Select Newsletter checkbox

        await registrationPage.newsletterCheckbox.check();

        // Step 11: Verify Newsletter checkbox is checked

        await expect(
            registrationPage.newsletterCheckbox
        ).toBeChecked();

        // Step 12: Uncheck Newsletter checkbox

        await registrationPage.newsletterCheckbox.uncheck();

        // Step 13: Verify Newsletter checkbox is unchecked

        await expect(
            registrationPage.newsletterCheckbox
        ).not.toBeChecked();

        // =====================================================
        // SPECIAL OFFERS CHECKBOX VALIDATION
        // =====================================================

        // Step 14: Verify Special Offers checkbox is unchecked

        await expect(
            registrationPage.specialOffersCheckbox
        ).not.toBeChecked();

        // Step 15: Select Special Offers checkbox

        await registrationPage.specialOffersCheckbox.check();

        // Step 16: Verify Special Offers checkbox is checked

        await expect(
            registrationPage.specialOffersCheckbox
        ).toBeChecked();

        // Step 17: Uncheck Special Offers checkbox

        await registrationPage.specialOffersCheckbox.uncheck();

        // Step 18: Verify Special Offers checkbox is unchecked

        await expect(
            registrationPage.specialOffersCheckbox
        ).not.toBeChecked();

    }
);

// =====================================================
// TC_REG_012 - SUCCESSFUL REGISTRATION USING MRS TITLE
// =====================================================

test(
    'TC_REG_012 - Verify successful registration using Mrs title',
    async ({ page }) => {

        // =====================================================
        // STEP 1 - INITIALIZE PAGE OBJECTS
        // =====================================================

        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        const registrationPage = new RegistrationPage(page);

        // =====================================================
        // STEP 2 - OPEN HOMEPAGE
        // =====================================================

        await homePage.open();

        // =====================================================
        // STEP 3 - NAVIGATE TO SIGNUP / LOGIN
        // =====================================================

        await homePage.clickSignupLogin();

        await expect(page).toHaveURL(/\/login\/?$/);

        // =====================================================
        // STEP 4 - ENTER NAME
        // =====================================================

        await signupLoginPage.enterName(
            registrationData.validName
        );

        // =====================================================
        // STEP 5 - GENERATE UNIQUE EMAIL
        // =====================================================

        const uniqueEmail =
            `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

        await signupLoginPage.enterEmail(uniqueEmail);

        // =====================================================
        // STEP 6 - CLICK SIGNUP
        // =====================================================

        await signupLoginPage.clickSignup();

        // =====================================================
        // STEP 7 - VERIFY ACCOUNT INFORMATION PAGE
        // =====================================================

        await expect(
            registrationPage.accountInformationHeading
        ).toBeVisible();

        // =====================================================
        // STEP 8 - SELECT MRS RADIO BUTTON
        // =====================================================

        await registrationPage.selectMrs();

        // =====================================================
        // STEP 9 - VERIFY MRS IS SELECTED
        // =====================================================

        await expect(
            registrationPage.mrsRadioButton
        ).toBeChecked();

        // =====================================================
        // STEP 10 - VERIFY MR IS NOT SELECTED
        // =====================================================

        await expect(
            registrationPage.mrRadioButton
        ).not.toBeChecked();

        // =====================================================
        // STEP 11 - ENTER PASSWORD
        // =====================================================

        await registrationPage.enterPassword(
            registrationData.password
        );

        // =====================================================
        // STEP 12 - SELECT DATE OF BIRTH
        // =====================================================

        await registrationPage.selectDateOfBirth(
            registrationData.dateOfBirth.day,
            registrationData.dateOfBirth.month,
            registrationData.dateOfBirth.year
        );

        // =====================================================
        // STEP 13 - FILL ADDRESS INFORMATION
        // =====================================================

        await registrationPage.fillAddressInformation(
            registrationData.address
        );

        // =====================================================
        // STEP 14 - CLICK CREATE ACCOUNT
        // =====================================================

        await registrationPage.clickCreateAccount();

        // =====================================================
        // STEP 15 - VERIFY ACCOUNT CREATION
        // =====================================================

        await expect(
            registrationPage.accountCreatedHeading
        ).toBeVisible();

        // =====================================================
        // STEP 16 - VERIFY SUCCESS URL
        // =====================================================

        await expect(page).toHaveURL(/\/account_created\/?$/);

    }
);

// =====================================================
// TC_REG_013 - DATE OF BIRTH DROPDOWN FUNCTIONALITY
// =====================================================

test(
    'TC_REG_013 - Verify Date of Birth dropdown functionality',
    async ({ page }) => {

        // =====================================================
        // STEP 1 - INITIALIZE PAGE OBJECTS
        // =====================================================

        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        const registrationPage = new RegistrationPage(page);

        // =====================================================
        // STEP 2 - OPEN HOMEPAGE
        // =====================================================

        await homePage.open();

        // =====================================================
        // STEP 3 - NAVIGATE TO SIGNUP / LOGIN
        // =====================================================

        await homePage.clickSignupLogin();

        // Verify Signup/Login page

        await expect(page).toHaveURL(/\/login\/?$/);

        // =====================================================
        // STEP 4 - ENTER VALID NAME
        // =====================================================

        await signupLoginPage.enterName(
            registrationData.validName
        );

        // =====================================================
        // STEP 5 - GENERATE UNIQUE EMAIL
        // =====================================================

        const uniqueEmail =
            `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

        // =====================================================
        // STEP 6 - ENTER EMAIL
        // =====================================================

        await signupLoginPage.enterEmail(uniqueEmail);

        // =====================================================
        // STEP 7 - CLICK SIGNUP
        // =====================================================

        await signupLoginPage.clickSignup();

        // =====================================================
        // STEP 8 - VERIFY ACCOUNT INFORMATION PAGE
        // =====================================================

        await expect(
            registrationPage.accountInformationHeading
        ).toBeVisible();

        // =====================================================
        // STEP 9 - SELECT DATE OF BIRTH
        // =====================================================

        await registrationPage.selectDateOfBirth(
            dateOfBirthTestData.day,
            dateOfBirthTestData.month,
            dateOfBirthTestData.year
        );

        // =====================================================
        // STEP 10 - VERIFY SELECTED DAY
        // =====================================================

        await expect(
            registrationPage.dayDropdown
        ).toHaveValue(
            dateOfBirthTestData.day
        );

        // =====================================================
        // STEP 11 - VERIFY SELECTED MONTH
        // =====================================================

        await expect(
            registrationPage.monthDropdown.locator(
                'option:checked'
            )
        ).toHaveText(
            dateOfBirthTestData.month
        );

        // =====================================================
        // STEP 12 - VERIFY SELECTED YEAR
        // =====================================================

        await expect(
            registrationPage.yearDropdown
        ).toHaveValue(
            dateOfBirthTestData.year
        );

    }
);
// =====================================================
// TC_REG_014 - COUNTRY DROPDOWN FUNCTIONALITY
// =====================================================

test(
    'TC_REG_014 - Verify Country dropdown functionality',
    async ({ page }) => {

        // =====================================================
        // STEP 1 - INITIALIZE PAGE OBJECTS
        // =====================================================

        const homePage = new HomePage(page);

        const signupLoginPage = new SignupLoginPage(page);

        const registrationPage = new RegistrationPage(page);

        // =====================================================
        // STEP 2 - OPEN HOMEPAGE
        // =====================================================

        await homePage.open();

        // =====================================================
        // STEP 3 - NAVIGATE TO SIGNUP / LOGIN
        // =====================================================

        await homePage.clickSignupLogin();

        // Verify Signup/Login page

        await expect(page).toHaveURL(/\/login\/?$/);

        // =====================================================
        // STEP 4 - ENTER VALID NAME
        // =====================================================

        await signupLoginPage.enterName(
            registrationData.validName
        );

        // =====================================================
        // STEP 5 - GENERATE UNIQUE EMAIL
        // =====================================================

        const uniqueEmail =
            `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

        // =====================================================
        // STEP 6 - ENTER EMAIL
        // =====================================================

        await signupLoginPage.enterEmail(uniqueEmail);

        // =====================================================
        // STEP 7 - CLICK SIGNUP
        // =====================================================

        await signupLoginPage.clickSignup();

        // =====================================================
        // STEP 8 - VERIFY ACCOUNT INFORMATION PAGE
        // =====================================================

        await expect(
            registrationPage.accountInformationHeading
        ).toBeVisible();

        // =====================================================
        // STEP 9 - VERIFY COUNTRY DROPDOWN IS VISIBLE
        // =====================================================

        await expect(
            registrationPage.countryDropdown
        ).toBeVisible();

        // =====================================================
        // STEP 10 - GET ALL AVAILABLE COUNTRIES
        // =====================================================

        const availableCountries = await registrationPage
            .countryDropdown
            .locator('option')
            .allTextContents();

        // =====================================================
        // STEP 11 - VERIFY EXPECTED COUNTRIES EXIST
        // =====================================================

        for (const country of countryDropdownTestData.countries) {

            expect(
                availableCountries.map(value => value.trim())
            ).toContain(country);

        }

        // =====================================================
        // STEP 12 - SELECT AND VERIFY EACH COUNTRY
        // =====================================================

        for (const country of countryDropdownTestData.countries) {

            // Select country

            await registrationPage.selectCountry(country);

            // Verify selected country

            await expect(
                registrationPage.countryDropdown.locator(
                    'option:checked'
                )
            ).toHaveText(country);

        }

    }
);


// =====================================================
// REUSABLE WORKFLOW FOR TC_REG_015 TO TC_REG_019
// =====================================================
// This helper creates a fresh account for each test.
// It reuses the existing Page Object methods.

async function registerAccountForConfirmation(page: Page): Promise<void> {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    await signupLoginPage.enterName(registrationData.validName);
    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 10)}@example.com`;
    await signupLoginPage.enterEmail(uniqueEmail);
    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();
    await registrationPage.selectMr();
    await registrationPage.enterPassword(registrationData.password);
    await registrationPage.selectDateOfBirth(
        registrationData.dateOfBirth.day,
        registrationData.dateOfBirth.month,
        registrationData.dateOfBirth.year
    );
    await registrationPage.fillAddressInformation(registrationData.address);
    await registrationPage.clickCreateAccount();
    await expect(registrationPage.accountCreatedHeading).toBeVisible();
}

// =====================================================
// TC_REG_015 - ACCOUNT CREATED CONFIRMATION
// =====================================================

test('TC_REG_015 - Verify Account Created confirmation page', async ({ page }) => {
    await registerAccountForConfirmation(page);
    await expect(page).toHaveURL(/\/account_created\/?$/);
    await expect(page.getByRole('heading', { name: 'Account Created!', exact: true }))
        .toBeVisible();
    await expect(page.getByRole('link', { name: 'Continue', exact: true }))
        .toBeVisible();
});

// =====================================================
// TC_REG_016 - CONTINUE BUTTON AFTER REGISTRATION
// =====================================================

test('TC_REG_016 - Verify Continue button after registration', async ({ page }) => {
    await registerAccountForConfirmation(page);
    await page.getByRole('link', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(page.getByRole('link', { name: 'Delete Account' })).toBeVisible();
});

// =====================================================
// TC_REG_017 - LOGGED-IN USERNAME AFTER REGISTRATION
// =====================================================

test('TC_REG_017 - Verify username after successful registration', async ({ page }) => {
    await registerAccountForConfirmation(page);
    await page.getByRole('link', { name: 'Continue', exact: true }).click();

    // Check the navigation bar displays the name used at signup.
    const loggedInMessage = page.locator('li').filter({
        hasText: `Logged in as ${registrationData.validName}`
    });
    await expect(loggedInMessage).toBeVisible();
});

// =====================================================
// TC_REG_018 - DELETE ACCOUNT AFTER REGISTRATION
// =====================================================

test('TC_REG_018 - Verify account deletion after registration', async ({ page }) => {
    await registerAccountForConfirmation(page);
    await page.getByRole('link', { name: 'Continue', exact: true }).click();
    await page.getByRole('link', { name: 'Delete Account' }).click();

    await expect(page).toHaveURL(/\/delete_account\/?$/);
    await expect(page.getByRole('heading', { name: 'Account Deleted!', exact: true }))
        .toBeVisible();
});

// =====================================================
// TC_REG_019 - CONTINUE BUTTON AFTER ACCOUNT DELETION
// =====================================================

test(
    'TC_REG_019 - Verify Continue button after account deletion',
    async ({ page }) => {

        // Step 1 - Register a new account
        await registerAccountForConfirmation(page);

        // Step 2 - Click Continue after account creation
        await page.getByRole('link', {
            name: 'Continue',
            exact: true
        }).click({
            noWaitAfter: true
        });

        // Step 3 - Verify homepage is displayed
        await expect(page).toHaveURL(/automationexercise\.com\/?$/, {
            timeout: 30000
        });

        // Step 4 - Verify user is logged in
        await expect(
            page.getByText('Logged in as', {
                exact: false
            })
        ).toBeVisible();

        // Step 5 - Click Delete Account
        await page.getByRole('link', {
            name: 'Delete Account'
        }).click({
            noWaitAfter: true
        });

        // Step 6 - Verify Account Deleted confirmation
        await expect(
            page.getByRole('heading', {
                name: 'Account Deleted!',
                exact: true
            })
        ).toBeVisible({
            timeout: 30000
        });

        // Step 7 - Click Continue after account deletion
        await page.getByRole('link', {
            name: 'Continue',
            exact: true
        }).click({
            noWaitAfter: true
        });

        // Step 8 - Verify navigation to homepage
        await expect(page).toHaveURL(
            /automationexercise\.com\/?$/,
            {
                timeout: 30000
            }
        );

        // Step 9 - Verify user is no longer logged in
        await expect(
            page.getByText('Logged in as', {
                exact: false
            })
        ).not.toBeVisible();

    }
);

});
