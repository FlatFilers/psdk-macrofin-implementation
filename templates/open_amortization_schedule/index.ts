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
import { SmartDateField } from '../../src/SmartDateField'

export const Open_Amortization_Schedule = new Sheet(
  'Open Amortization Schedule',
  {
    //This should be generated from FlatFile (Is this something flatfile can do?) The ideal value is a combination of the transID, subsidary and currency with a prefix of OB_AS. This is the Unique backend Identifier. Can be generated from flatfile in absence of any Unique backend identifier but netsuite can generate this also.

    externalid: TextField({
      label: 'External ID',
      description:
        'This is the Unique backend Identifier for an Employee Record. Should be unique for all Entity Records. This can be used to link other record sets with this Employee.',
      required: true,
      unique: true,
    }),

    //Free Form text field
    tranId: TextField({
      label: 'Tran ID',
      required: true,
      unique: true,
    }),

    //Source from: Subsidary List
    subsidiary: TextField({
      label: 'Subsidiary',
      required: true,
      unique: false,
    }),
    //Source from: Currency List
    currency: ReferenceField({
      label: 'Currency',
      sheetKey: 'Currency_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      required: true,
      unique: false,
    }),

    // This is a numerical field
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
    //Free Form text field
    memo: TextField({
      label: 'Memo',
      required: false,
      unique: false,
    }),

    tranDate: SmartDateField({
      label: 'Tran Date',
      formatString: 'dd/MM/yyyy',
      required: true,
    }),

    //should follow the following format "AUG 2022" (MMM YYYYY)
    postingPeriod: TextField({
      label: 'Posting Period',
      description:
        'This is the accounting period based on the transaction date.  Formula driven. Do not override.',
    }),

    //Source from: Charts of accounts
    journalItemLine_account: ReferenceField({
      label: 'Journal Item Line Account',
      sheetKey: 'Chart_of_Accounts_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      required: true,
    }),

    //Free form text
    journalItemLine_memo: TextField({
      label: 'Journal Item Line Memo',
      required: true,
    }),

    //Source from: Vendor List
    journalItemLine_entityRef: TextField({
      label: 'Journal Item Line Entity Ref',
      sheetKey: 'Vendor',
      foreignKey: 'companyName',
      relationship: 'has-many',
      required: true,
    }),

    //Decimal Number (with 2 deminal spaces without comma seperated)
    journalItemLine_debitAmount: NumberField({
      label: 'Journal Item Line Debit Amount',
      required: true,
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),
    //Decimal Number (with 2 deminal spaces without comma seperated)
    journalItemLine_creditAmount: NumberField({
      label: 'Journal Item Line Credit Amount',
      required: true,
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),
    //Source from Amortization Template (a worsheet with one column titled "name") - need to confirm the API can pull this information from NetSuite
    journalItemLine_schedule: TextField({
      label: 'Journal Item Line Schedule',
      required: false,
    }),

    //dd/MM/YYYY
    journalItemLine_startdate: SmartDateField({
      label: 'Journal Item Line Start Date',
      formatString: 'dd/MM/yyyy',
      required: false,
    }),

    //dd/MM/YYYY
    journalItemLine_enddate: SmartDateField({
      label: 'Journal Item Line End Date',
      formatString: 'dd/MM/yyyy',
      required: false,
    }),

    //This should source from the Department List

    journalItemLine_department: ReferenceField({
      label: 'Journal Item Line Department',
      sheetKey: 'Department',
      foreignKey: 'name',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),

    //This should source from the Class List

    journalItemLine_class: TextField({
      label: 'Journal Item Line Class',
      sheetKey: 'Class',
      foreignKey: 'name',
      relationship: 'has-many',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),

    //This should source from the Location List

    journalItemLine_location: TextField({
      label: 'Journal Item Line Location',
      sheetKey: 'Location',
      foreignKey: 'name',
      relationship: 'has-many',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),
  },
  {
    recordCompute: (record, _session, _logger) => {
      const debit = record.get('journalItemLine_debitAmount')
      const credit = record.get('journalItemLine_creditAmount')

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

      //need to test this!
      record.set(
        'externalid',
        'OB_AS' +
          record.get('transID') +
          record.get('subsidiary') +
          record.get('currency')
      )
    },
  }
)
