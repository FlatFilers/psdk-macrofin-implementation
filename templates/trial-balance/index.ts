import {
  BooleanField,
  DateField,
  NumberField,
  OptionField,
  Sheet,
  TextField,
  Workbook,
  Message,
  ReferenceField,
} from '@flatfile/configure'

import { SmartDateField } from '../../src/SmartDateField'

export const Trial_Balance = new Sheet(
  'Trial Balance',
  {
    //External ID should be a non-editable field. This will be populated by NetSuite
    externalId: TextField({
      label: 'External ID',
      description: 'This is used to group the transaction lines together.',
      required: false,
      unique: true,
    }),

    //This should be Non Editable field as this will be populated by NetSuite - required, but marked as non-editable and populated by NetSuite - will need to find a workaround for this
    tranid: TextField({
      label: 'Tran ID',
      description: 'This is used to group the transaction lines together.',
      required: true,
      unique: true,
      validate: (value) => {
        const regex = new RegExp('', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    //This should from the Subsidary List and should populate the Subsidary Name
    Subsidiary: ReferenceField({
      label: 'Subsidiary Name',
      sheetKey: 'Subsidiary_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      description:
        'This is a reference to the subsidiary which must be created in your Setup > Company > Subsidiaries prior to import.',
      required: true,
    }),

    //This should be the internal ID of the Subsidary selected in Column C - lookup field!
    SubsidiaryID: TextField({
      label: 'Subsidiary ID',
      description:
        'This is a reference to the subsidiary which must be created in your Setup > Company > Subsidiaries prior to import.',
      required: false,

      //hides frield from mapping
      stageVisibility: {
        mapping: false,
      },
    }),

    //This should source from the Currency sheet
    Currency: ReferenceField({
      label: 'Currency',
      sheetKey: 'Currency_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      description:
        'Enter the transaction currency to be used.  This is a reference to the Currency record which must be created under Lists > Accounting > Currencies prior to import.',
      required: true,
    }),

    // This is a numerical field - No we can leave this as a decimal number with a Maximum of 8 decimal places
    exchangeRate: NumberField({
      label: 'Exchange Rate',
      required: true,
      description:
        'Enter the currency exchange rate as of cutover date for the transaction.  Maximum of 8 decimal places (0.12345678)  Ask your lead consultant for details.',
      annotations: {
        // default: true,
        // defaultMessage: 'Exchange Rate was not provided, it has been set to ',
        compute: true,
        computeMessage:
          'This value was automatically reformatted to eight decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(8))
      },
    }),

    //Should follow the format  MMM YYYY - This is the accounting period based on the transaction date. it should follow the format MMM YYYY (e.g. JAN 2022)
    postingPeriod: TextField({
      label: 'Posting Period',
      description:
        'This is the accounting period based on the transaction date.  Formula driven. Do not override.',
    }),

    tranDate: SmartDateField({
      label: 'Tran Date',
      formatString: 'dd/MM/YY',
      required: true,
      description:
        'Enter the transaction date.  This defaults to the date entered on the instruction sheet. Override if needed.',
    }),

    memoHeader: TextField({
      label: 'Memo Header',
      description:
        'You can retain the default memo driven by the formula or enter the actual description of the transaction. ',
      required: true,
      validate: (value) => {
        const regex = new RegExp('^$|^(?=.{1,999}$).*', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 999 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),
    // This column should filter from the Charts of Accounts Worksheet - Account - this should source from the Chart of account worksheet
    account: ReferenceField({
      label: 'Account Name',
      sheetKey: 'Chart_of_Accounts_NetSuite_Extract',
      foreignKey: 'Account Name',
      relationship: 'has-many',
      required: true,
      description:
        'This is a reference to the GL account against which the amounts have to be posted.    Simply enter the account number of the GL account.  The account must be setup in Lists > Accounting > Accounts prior to import.',
    }),

    //This should be the internal ID of the value set in the account column (column i)
    accountInternalID: TextField({
      label: 'Account ID',
      required: true,
      description:
        '(Lookup Needed) Displays the account name id on the account name.',
    }),

    memoLines: TextField({
      label: 'Memo Lines',
      required: true,
      description:
        'You can retain the default memo driven by the formula or enter the actual description of the transaction line.',
      validate: (value) => {
        const regex = new RegExp('^$|^(?=.{1,999}$).*', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 999 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),
    //This should be a numerical value with a maximum of 2 decimal points
    debit: NumberField({
      label: 'Debit',
      description:
        'Enter the debit amount in this field.  Ensure NOT to use a thousand separator on the number format.  Maximum of 2 decimal places.',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),

    credit: NumberField({
      label: 'Credit',
      description:
        'Enter the credit amount in this field.  Ensure NOT to use a thousand separator on the number format.  Maximum of 2 decimal places.',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),

    //This should source from the Department List

    department: ReferenceField({
      label: 'Department',
      sheetKey: 'Department',
      foreignKey: 'name',
      relationship: 'has-many',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),

    //This should source from the Class List

    class: ReferenceField({
      label: 'Class',
      sheetKey: 'Class',
      foreignKey: 'name',
      relationship: 'has-many',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),

    //This should source from the Location List

    location: ReferenceField({
      label: 'Location',
      sheetKey: 'Location',
      foreignKey: 'name',
      relationship: 'has-many',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),
  },
  {
    recordCompute: (record, _session, _logger) => {
      const credit = record.get('credit')
      const debit = record.get('debit')

      if (credit && debit) {
        record.addError(
          'credit',
          'Either credit or debit should be populated per line'
        )
        record.addError(
          'debit',
          'Either credit or debit should be populated per line'
        )
      }

      //swap these over to common syntax

      const sublinks = record.getLinks('Subsidiary')
      const SubsidiaryID = sublinks[0].Internal_Id
      if (!!SubsidiaryID) {
        record.set('SubsidiaryID', SubsidiaryID)
      }

      const acclinks = record.getLinks('account')
      const accountID = acclinks[0].Internal_Id
      if (!!accountID) {
        record.set('accountInternalID', accountID)
      }
    },
  }
)
