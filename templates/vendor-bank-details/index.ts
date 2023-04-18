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
  ReferenceField,
} from '@flatfile/configure'

export const Vendor_Bank_Details = new Sheet(
  'Vendor Bank Details',
  {
    internalID: TextField({
      label: 'Internal ID',
      description:
        'This is the Unique backend Identifier for the Vendor Record.',
      unique: true,
    }),

    entityID: TextField({
      label: 'Entity ID',
      description:
        'This is the Front-End Vendor ID. Should be unique for all the Vendors. This field is not required if you use Auto-Generated Numbers.',
      validate: (value) => {
        const regex = new RegExp('^$|^(?=.{1,80}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    companyName: TextField({
      label: 'Company Name',
      description: "Enter the Vendor's company name.",
      validate: (value) => {
        const regex = new RegExp('^$|^(?=.{1,83}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    subsidiary: ReferenceField({
      label: 'Subsidiary',
      sheetKey: 'Subsidiary_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      description:
        'This is a reference to the subsidiary which must be created in your account prior to import.    Select from the drop down field.',
    }),

    paymentFileFormat: ReferenceField({
      label: 'Payment File Format',
      sheetKey: 'Payment_File_Format_NetSuite_Extract',
      foreignKey: 'name',
      relationship: 'has-many',
      description: 'Select the appropriate payment file format to be used',
    }),

    // What is the formula for this field?

    bankRecordName: TextField({
      label: 'Bank Record Name',
      description: 'Enter the bank detail record name.  ***Formula driven***',
    }),

    type: OptionField({
      label: 'Type',
      description:
        'If the vendor have multiple bank detail information, identify which bank detail will be used as the Primary record.',
      options: {
        primary: 'Primary',
        secondary: 'Secondary',
      },
    }),

    bankAccountType: OptionField({
      label: 'Bank Account Type',
      description: 'Select what is the bank account type - Checking or Savings',
      options: {
        checking: 'Checking',
        savings: 'Savings',
      },
    }),

    bankAccountName: TextField({
      label: 'Bank Account Name',
      description: 'Enter the bank account name.',
    }),

    // Do we need validations here?

    bankAccountNumber: TextField({
      label: 'Bank Account Number',
      description:
        'Enter the bank account number. Remove all special characters.',
    }),

    sortCode: TextField({
      label: 'Sort Code',
      description: 'Enter the sort code. Remove all special characters.',
    }),

    bicswift: TextField({
      label: 'BIC/SWIFT',
      description: 'Enter the BIC/SWIFT. Remove all special characters.',
    }),

    IBAN: TextField({
      label: 'IBAN',
      description: 'Enter the IBAN. Remove all special characters.',
    }),

    routingNumber: TextField({
      label: 'Routing Number',
      description: 'Enter the routing number. Remove all special characters.',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
