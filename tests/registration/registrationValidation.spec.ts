import { test, expect } from '@playwright/test';

import { HomePage } from '../../pages/homePage';
import { SignupLoginPage } from '../../pages/SignUpLoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage';

import { registrationData } from '../../test-data/registrationData';

// =====================================================
// REGISTRATION VALIDATION TEST SUITE
// =====================================================

test.describe('ECQA-4 - Registration Validation', () => {

    // =====================================================
    // TC_REG_020 - SHORT PASSWORD VALIDATION
    // =====================================================

    test(
        'TC_REG_020 - Verify registration with short password',
        async ({ page }) => {

            const homePage = new HomePage(page);
            const signupLoginPage = new SignupLoginPage(page);
            const registrationPage = new RegistrationPage(page);

            // Step 1 - Open homepage
            await homePage.open();

            // Step 2 - Navigate to Signup/Login
            await homePage.clickSignupLogin();

            // Step 3 - Enter name
            await signupLoginPage.enterName(
                registrationData.validName
            );

            // Step 4 - Generate unique email
            const uniqueEmail =
                `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

            await signupLoginPage.enterEmail(uniqueEmail);

            // Step 5 - Click Signup
            await signupLoginPage.clickSignup();

            // Step 6 - Verify Account Information page
            await expect(
                registrationPage.accountInformationHeading
            ).toBeVisible();

            // Step 7 - Enter short password
            await registrationPage.enterPassword('a');

            // Step 8 - Verify entered password
            await expect(
                registrationPage.passwordInput
            ).toHaveValue('a');

            // Step 9 - Fill address information
            await registrationPage.fillAddressInformation(
                registrationData.address
            );

            // Step 10 - Submit registration
            await registrationPage.clickCreateAccount();

            // Step 11 - Determine the result
            const accountCreated = await registrationPage
                .accountCreatedHeading
                .isVisible();

            if (accountCreated) {

                console.log(
                    'OBSERVATION: Registration accepted a one-character password.'
                );

            } else {

                console.log(
                    'OBSERVATION: Registration did not reach the account-created page.'
                );

            }

        }
    );

    // =====================================================
// TC_REG_021 - LONG PASSWORD
// =====================================================

test('TC_REG_021 - Verify registration with long password', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    await signupLoginPage.enterName(registrationData.validName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);
    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    const longPassword = 'Test@123456789012345678901234567890';

    await registrationPage.enterPassword(longPassword);

    await expect(registrationPage.passwordInput).toHaveValue(longPassword);

    await registrationPage.fillAddressInformation(registrationData.address);

    await registrationPage.clickCreateAccount();

    const accountCreated = await registrationPage.accountCreatedHeading.isVisible();

    console.log(`TC_REG_021: Long password accepted = ${accountCreated}`);

});


// =====================================================
// TC_REG_022 - PASSWORD WITH SPECIAL CHARACTERS
// =====================================================

test('TC_REG_022 - Verify registration with special characters in password', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    await signupLoginPage.enterName(registrationData.validName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);
    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    const specialPassword = 'Test@123!#$%';

    await registrationPage.enterPassword(specialPassword);

    await expect(registrationPage.passwordInput).toHaveValue(specialPassword);

    await registrationPage.fillAddressInformation(registrationData.address);

    await registrationPage.clickCreateAccount();

    const accountCreated = await registrationPage.accountCreatedHeading.isVisible();

    console.log(`TC_REG_022: Special-character password accepted = ${accountCreated}`);

});


// =====================================================
// TC_REG_023 - NAME WITH LEADING AND TRAILING SPACES
// =====================================================

test('TC_REG_023 - Verify name with leading and trailing spaces', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    const nameWithSpaces = '  QA Tester  ';

    await signupLoginPage.enterName(nameWithSpaces);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);

    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    console.log('TC_REG_023: Name with spaces accepted on signup form.');

});


// =====================================================
// TC_REG_024 - NAME WITH SPECIAL CHARACTERS
// =====================================================

test('TC_REG_024 - Verify name containing special characters', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    const specialName = 'QA@Test#123';

    await signupLoginPage.enterName(specialName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);

    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    console.log('TC_REG_024: Name containing special characters accepted on signup form.');

});


// =====================================================
// TC_REG_025 - INVALID MOBILE NUMBER
// =====================================================

test('TC_REG_025 - Verify registration with invalid mobile number', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    await signupLoginPage.enterName(registrationData.validName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);
    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    await registrationPage.enterPassword(registrationData.password);

    await registrationPage.fillAddressInformation(registrationData.address);

    await registrationPage.mobileNumberInput.fill('ABC123');

    await expect(registrationPage.mobileNumberInput).toHaveValue('ABC123');

    await registrationPage.clickCreateAccount();

    const accountCreated = await registrationPage.accountCreatedHeading.isVisible();

    console.log(`TC_REG_025: Invalid mobile number accepted = ${accountCreated}`);

});


// =====================================================
// TC_REG_026 - ALPHABETIC ZIP CODE
// =====================================================

test('TC_REG_026 - Verify registration with alphabetic ZIP Code', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    await signupLoginPage.enterName(registrationData.validName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);
    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    await registrationPage.enterPassword(registrationData.password);

    await registrationPage.fillAddressInformation(registrationData.address);

    await registrationPage.zipcodeInput.fill('ABCDEF');

    await expect(registrationPage.zipcodeInput).toHaveValue('ABCDEF');

    await registrationPage.clickCreateAccount();

    const accountCreated = await registrationPage.accountCreatedHeading.isVisible();

    console.log(`TC_REG_026: Alphabetic ZIP Code accepted = ${accountCreated}`);

});


// =====================================================
// TC_REG_027 - REGISTRATION WITHOUT TITLE
// =====================================================

test('TC_REG_027 - Verify registration without selecting title', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    await signupLoginPage.enterName(registrationData.validName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);
    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    await expect(registrationPage.mrRadioButton).not.toBeChecked();
    await expect(registrationPage.mrsRadioButton).not.toBeChecked();

    await registrationPage.enterPassword(registrationData.password);

    await registrationPage.fillAddressInformation(registrationData.address);

    await registrationPage.clickCreateAccount();

    const accountCreated = await registrationPage.accountCreatedHeading.isVisible();

    console.log(`TC_REG_027: Registration without title accepted = ${accountCreated}`);

});


// =====================================================
// TC_REG_028 - REGISTRATION WITHOUT DATE OF BIRTH
// =====================================================

test('TC_REG_028 - Verify registration without Date of Birth', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    await signupLoginPage.enterName(registrationData.validName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);
    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    await registrationPage.enterPassword(registrationData.password);

    // Date of Birth intentionally not selected

    await registrationPage.fillAddressInformation(registrationData.address);

    await registrationPage.clickCreateAccount();

    const accountCreated = await registrationPage.accountCreatedHeading.isVisible();

    console.log(`TC_REG_028: Registration without DOB accepted = ${accountCreated}`);

});


// =====================================================
// TC_REG_029 - REGISTRATION FORM REFRESH
// =====================================================

test('TC_REG_029 - Verify registration form after browser refresh', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();
    await homePage.clickSignupLogin();

    await signupLoginPage.enterName(registrationData.validName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);
    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    await registrationPage.enterPassword('Test@123');

    await registrationPage.firstNameInput.fill('QA');

    await registrationPage.lastNameInput.fill('Tester');

    await page.reload({ waitUntil: 'domcontentloaded' });

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    await expect(registrationPage.passwordInput).toBeVisible();

    await expect(registrationPage.firstNameInput).toBeVisible();

    console.log('TC_REG_029: Registration page remained accessible after refresh.');

});


// =====================================================
// TC_REG_030 - BROWSER BACK AND FORWARD NAVIGATION
// =====================================================

test('TC_REG_030 - Verify browser Back and Forward navigation', async ({ page }) => {

    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.open();

    await homePage.clickSignupLogin();

    await expect(page).toHaveURL(/\/login\/?$/);

    await signupLoginPage.enterName(registrationData.validName);

    const uniqueEmail =
        `qa${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;

    await signupLoginPage.enterEmail(uniqueEmail);

    await signupLoginPage.clickSignup();

    await expect(registrationPage.accountInformationHeading).toBeVisible();

    // Browser Back
    await page.goBack({ waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(/\/login\/?$/);

    // Browser Forward
    await page.goForward({ waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(/\/signup\/?$/);

    await expect(registrationPage.accountInformationHeading).toBeVisible();

});

});