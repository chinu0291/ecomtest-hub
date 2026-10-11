// =====================================================
// REGISTRATION TEST DATA
// =====================================================

export const registrationData = {

    // =====================================================
    // BASIC REGISTRATION INFORMATION
    // =====================================================

    validName: 'Rahul Sharma',

    // Generate a unique email for every test execution
    validEmail: `qa${Date.now()}@example.com`,

    // Existing registered email for duplicate-email testing
    // This value must be configured in .env or GitHub Actions
    existingEmail: process.env.EXISTING_TEST_EMAIL ?? '',

    // =====================================================
    // ACCOUNT INFORMATION
    // =====================================================

    password: 'Test@12345',

    // =====================================================
    // DATE OF BIRTH
    // =====================================================

    dateOfBirth: {
        day: '10',
        month: 'May',
        year: '2000'
    },

    // =====================================================
    // ADDRESS INFORMATION
    // =====================================================

    address: {

        firstName: 'Rahul',

        lastName: 'Sharma',

        company: 'QA Testing Company',

        address: '123 Test Street',

        address2: 'Apartment 101',

        country: 'India',

        state: 'Odisha',

        city: 'Bhubaneswar',

        zipcode: '751001',

        mobileNumber: '9876543210'

    }

};


// =====================================================
// TC_REG_009 - MANDATORY ADDRESS FIELDS
// =====================================================

export const mandatoryAddressFields = [

    {
        fieldName: 'First Name',
        fieldKey: 'firstName',
        selector: '#first_name'
    },

    {
        fieldName: 'Last Name',
        fieldKey: 'lastName',
        selector: '#last_name'
    },

    {
        fieldName: 'Address',
        fieldKey: 'address',
        selector: '#address1'
    },

    {
        fieldName: 'State',
        fieldKey: 'state',
        selector: '#state'
    },

    {
        fieldName: 'City',
        fieldKey: 'city',
        selector: '#city'
    },

    {
        fieldName: 'ZIP Code',
        fieldKey: 'zipcode',
        selector: '#zipcode'
    },

    {
        fieldName: 'Mobile Number',
        fieldKey: 'mobileNumber',
        selector: '#mobile_number'
    }

] as const;


// =====================================================
// TC_REG_010 - REGISTRATION WITHOUT OPTIONAL FIELDS
// =====================================================

export const registrationWithoutOptionalFields = {

    firstName: 'Rahul',

    lastName: 'Sharma',

    address: '123 Test Street',

    country: 'India',

    state: 'Odisha',

    city: 'Bhubaneswar',

    zipcode: '751001',

    mobileNumber: '9876543210'

};


// =====================================================
// TC_REG_013 - DATE OF BIRTH TEST DATA
// =====================================================

export const dateOfBirthTestData = {

    day: '15',

    month: 'March',

    year: '2000'

};


// =====================================================
// TC_REG_014 - COUNTRY DROPDOWN TEST DATA
// =====================================================

export const countryDropdownTestData = {

    countries: [

        'India',

        'United States',

        'Canada'

    ]

};