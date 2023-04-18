import {
  BooleanField,
  DateField,
  NumberField,
  OptionField,
  LinkedField,
  Sheet,
  TextField,
  Workbook,
  Message,
} from '@flatfile/configure'

export const Vendors_BASELINE = new Sheet(
  'Vendors BASELINE',
  {
    externalId: TextField({
      label: 'ExternalID',
      description:
        'This is the backend Id to identify each vendor. Must be unique for each vendor. Can be copied from the Vendor ID in absence of any Unique backend identifier.',
      required: true,
      unique: true,
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,100}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    vendorId: TextField({
      label: 'Vendor ID',
      description:
        'This is the Front-End Vendor ID (Displayed in the UI). Should be unique for all the Vendors. This field is not required if Auto-Generated Numbering is turned on.',
      required: true,
      unique: true,
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,83}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    isPerson: BooleanField({
      label: 'Individual',
      description: 'Enter TRUE if vendor is an individual',
    }),

    isInactive: BooleanField({
      label: 'Inactive',
      description: 'Enter TRUE to mark the vendor inactive',
    }),

    representingSubsidiary: TextField({
      label: 'Represents Subsidiary',
      description:
        'Indicates that this entity is an intercompany vendor. Select the subsidiary this vendor represents as the seller in intercompany transactions.',
    }),

    firstName: TextField({
      label: 'First Name',
      description: '^(?=.{1,32}$).*',
      required: true,
    }),

    middleName: TextField({
      label: 'Middle Name',
      description:
        'Optional if the Vendor is an Individual. Leave blank for Companies',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,32}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    lastName: TextField({
      label: 'Last Name',
      description:
        'Required only if the Vendor is an Individual. Leave blank for Companies',
      required: true,
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,32}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    companyName: TextField({
      label: 'Company Name',
      description:
        ' Enter Company Name. Becomes mandatory if the Vendor is a company. Should be left blank for Individual Vendors',
      required: true,
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,83}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    printOnCheckAs: TextField({
      label: 'Print On Check As',
      description:
        '(column was hidden in template file) What you enter here prints on the Pay to the Order of line of a check instead of what you entered in the Vendor field.',
    }),

    category: OptionField({
      label: 'Category',
      description:
        'You can select the category that applies to this vendor.  To add choices to this list, go to Setup > Accounting > Accounting Lists > New > Vendor Category.  You must select a Tax agency for sales tax agencies, payroll tax agencies and payroll benefits providers.',
      options: {
        '1': '1099 contractor',
        '2': 'Consultant',
        '3': 'Tax agency',
        '4': 'Supplies',
      },
    }),

    subsidiary: TextField({
      label: 'Primary Subsidiary',
      description:
        'This is a reference to the subsidiary which must be created in your account prior to import.    In case you want to refer a child subsidiary the complete hierarchy must be provided in the format: Parent Subsidiary Name : Child Subsidiary Name.  The delimiter to be used for selecting multiple subsidiaries is a pipe ( | ), without spaces between the two subsidiary references.  This field becomes mandatory if you are using a NetSuite One-World account.',
      required: true,
    }),

    phone: TextField({
      label: 'Phone',
      description:
        'The information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568. Setup > Company > General Preferences',
    }),

    fax: NumberField({
      label: 'Fax',
      description:
        'The information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
    }),

    email: TextField({
      label: 'Email',
      description:
        '(missing max size validation of 300) This field should contain the main E-mail address of the Vendor. The information entered for this field must conform to the standard e-mail address format. i.e. user@domain.com',
    }),

    comments: TextField({
      label: 'comments',
      description:
        'Enter general Comments for the Vendor. Should not be used to enter the User Notes.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,4000}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    emailpreference: OptionField({
      label: 'Email Preference',
      description:
        ' Select the format for email that is sent to this person or company.  Select Default to use the preference set at Home > Set Preferences.  Options Include: -Default -HTML -PDF',
      options: {
        Default: 'Default',
        HTML: 'HTML',
        PDF: 'PDF',
      },
    }),

    emailTransactions: BooleanField({
      label: 'Send Transaction Via Email',
      description:
        'Set a preferred transaction delivery method for this vendor.',
    }),

    faxTransactions: BooleanField({
      label: 'Send Transaction Via Fax',
      description:
        'Set a preferred transaction delivery method for this vendor.',
    }),

    printTransactions: BooleanField({
      label: 'Send Transaction Via Print',
      description:
        'Set a preferred transaction delivery method for this vendor.',
    }),

    address1AddressName: TextField({
      label: 'Label',
      description:
        ' This field is only required if you use the addressList element. It maps to the Label of an address and indicates the beginning of an individual address. The Label must be unique for all the different addresses for this Vendor',
      required: true,
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,150}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    address1Attention: TextField({
      label: 'Attention',
      description: 'Enter the name of the vendor Individual in this field',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,100}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    address1Addressee: TextField({
      label: 'Addressee',
      description: "Enter the vendor's Addressee or the Company Name here",
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,100}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    address1Phone: TextField({
      label: 'Phone',
      description: "Enter the vendor's Address Phone in this field",
    }),

    address1Line1: TextField({
      label: 'Address 1',
      description: "Enter the vendor's Address Line 1 in this field",
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,150}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    address1Line2: TextField({
      label: 'Address 2',
      description: "Enter the vendor's Address Line 2 in this field",
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,150}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    address1City: TextField({
      label: 'City',
      description: "Enter the vendor's City of the address in this field",
    }),

    address1State: TextField({
      label: 'Province/State',
      description:
        "Enter the vendor's State in this field. You may enter the standard abbreviation or the full state or province name.",
    }),

    address1ZipCode: TextField({
      label: 'address1_zipCode',
    }),

    address1Country: TextField({
      label: 'Country',
      description:
        "Enter the vendor's country in this field.  This is a reference to a country list that must exist in your account prior to import.",
    }),

    address1DefaultShipping: BooleanField({
      label: 'Default Shipping',
      description:
        'If this address is to be marked as a Default Shipping address, enter TRUE. ',
    }),

    address1DefaultBilling: BooleanField({
      label: 'Default Billing',
      description:
        "If the aforementioned address is to be marked as the vendor's Default Billing address, enter TRUE. ",
    }),

    address2AddressName: TextField({
      label: 'address2_addressName',
    }),

    address2Attention: TextField({
      label: 'address2_attention',
    }),

    address2Addressee: TextField({
      label: 'address2_addressee',
    }),

    address2Phone: TextField({
      label: 'address2_phone',
    }),

    address2Line1: TextField({
      label: 'address2_line1',
    }),

    address2Line2: TextField({
      label: 'address2_line2',
    }),

    address2City: TextField({
      label: 'address2_city',
    }),

    address2State: TextField({
      label: 'address2_state',
    }),

    address2ZipCode: TextField({
      label: 'address2_zipCode',
    }),

    address2Country: TextField({
      label: 'address2_country',
    }),

    address2DefaultShipping: TextField({
      label: 'address2_defaultShipping',
    }),

    address2DefaultBilling: TextField({
      label: 'address2_defaultBilling',
    }),

    legalName: TextField({
      label: 'Legal Name',
      description:
        'Enter the legal name for this vendor for financial purposes. ',
      unique: true,
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,83}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    accountNumber: NumberField({
      label: 'Account',
      description:
        'If your vendors assign account numbers to you, enter one here. This number will later appear in these places: In the Vendor # field on purchase orders In the Memo field on checks',
    }),

    terms: TextField({
      label: 'Terms',
      description:
        'This is a reference to a Term record that must exist in your account prior to import (Setup > Accounting > Accounting Lists > New > Term).',
    }),

    defaultExpenseAccount: TextField({
      label: 'Default Expense Account',
      description:
        ' This is a reference to the standard expense account for goods and services that must exist prior to import  (Lists > Accounting > Accounts). The complete hierarchy of the accounts should be provided if you want to refer to a child account. The expected format is " Child Account Number : Parent Name Child Account Name"',
    }),

    defaultPayablesAccount: TextField({
      label: 'Default Payables Account',
      description: 'Choose the default payable account for this vendor record.',
    }),

    creditLimit: TextField({
      label: 'Credit Limit',
      description: 'Enter vendor credit limit',
    }),

    taxIdNum: NumberField({
      label: 'Tax ID',
      description:
        "Enter your vendor's tax ID number (SSN for an individual). This is necessary if you are required to issue a 1099 form",
    }),

    is1099Eligible: BooleanField({
      label: '1099 Eligible',
      description: 'Enter TRUE to mark this Vendor 1099 Eligible',
    }),

    openingBalance: NumberField({
      label: 'openingBalance',
      description: ' Enter the opening balance amount.',
    }),

    openingBalanceDate: TextField({
      label: 'Opening Balance Date',
      description: 'Enter your Opening balance date for this vendor',
      validate: (value) => {
        const regex = new RegExp(
          '^(((0[13578]|(10|12))/(0[1-9]|[1-2][0-9]|3[0-1]))|(02/(0[1-9]|[1-2][0-9]))|((0[469]|11)/(0[1-9]|[1-2][0-9]|30)))/[0-9]{4}$',
          ''
        )
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    openingbalanceaccount: TextField({
      label: 'Opening Balance Account',
      description: 'Select the account this opening balance is applied to.',
    }),

    purchaseorderquantity: NumberField({
      label: 'Vendor Bill - Purchase Order Quantity Tolerance',
      description:
        'Enter the tolerance limit for the discrepancy between the quantity on the vendor bill and purchase order for this vendor.',
    }),

    purchaseorderamount: NumberField({
      label: 'Vendor Bill - Purchase Order Amount Tolerance',
      description:
        'Enter the tolerance limit for the discrepancy between the amount on the vendor bill and purchase order for this vendor.',
    }),

    purchaseorderquantitydiff: NumberField({
      label: 'Vendor Bill - Purcahse Order Quantity Difference',
      description:
        'Enter the difference limit for the discrepancy between the quantity on the vendor bill and purchase order for this vendor.',
    }),

    receiptquantity: NumberField({
      label: 'Vendor Bill - Item Receipt Quantity Tolerance',
      description:
        'Enter the tolerance limit for the discrepancy between the quantity on the vendor bill and item receipt for this vendor.',
    }),

    receiptamount: NumberField({
      label: 'receiptamount',
      description:
        'Enter the tolerance limit for the discrepancy between the amount on the vendor bill and item receipt for this vendor',
    }),

    receiptquantitydiff: NumberField({
      label: 'Vendor Bill - Item Receipt Quantity Difference',
      description:
        ' Enter the difference limit for the discrepancy between the quantity on the vendor bill and item receipt for this vendor.',
    }),

    currency: OptionField({
      label: 'Primary Currency',
      description:
        " Select the primary currency that this vendor uses. Currency record must exist in your account prior to import (Lists > Accounting > Currencies).  NOTE: The currency entered must match vendor's default currency.",
      options: {
        USD: 'US Dollar',
        GBP: 'British Pound',
        EUR: 'Euro',
        CAD: 'Canadian Dollar',
      },
    }),

    additionalCurrency1: OptionField({
      label: 'Additional Currency 1',
      description:
        'Select any currencies outside of the base currency that this vendor uses',
      options: {
        USD: 'US Dollar',
        GBP: 'British Pound',
        EUR: 'Euro',
        CAD: 'Canadian Dollar',
      },
    }),

    additionalCurrency2: OptionField({
      label: 'Additional Currency 2',
      description:
        'Select any currencies outside of the base currency that this vendor uses',
      options: {
        USD: 'US Dollar',
        GBP: 'British Pound',
        EUR: 'Euro',
        CAD: 'Canadian Dollar',
      },
    }),

    incoterm: TextField({
      label: 'Incoterm',
      description:
        'Choose the standardized three-letter trade term to be used on transactions related to this vendor.  These terms are international commercial procurement practices that communicate the tasks, costs, and risks associated with the transportation and delivery of goods. Incoterms define where the customer takes ownership of the product and are typically used for international orders, such as when an item goes through customs or crosses a border.',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
