import {
  BooleanField,
  DateField,
  NumberField,
  OptionField,
  ReferenceField,
  Sheet,
  TextField,
  Workbook,
  Message,
} from '@flatfile/configure'

//import due_date_to_yyyy_mm_dd from './hooks/due-date-to-yyyy-mm-dd.js'
//import transaction_date_to_yyyy_mm_dd from './hooks/transaction-date-to-yyyy-mm-dd.js'
import set_transaction_amount_base_currency_amount from './hooks/set-transaction-amount-base-currency-amount.js'
import { SmartDateField } from '../../src/SmartDateField'

export const Open_AP_Template = new Sheet(
  'Open AP Template',
  {
    tranId: TextField({
      label: 'Tran Id',
      description: 'Enter Invoice number. This field should be unique.',
      required: true,
      unique: true,
      validate: (value) => {
        const regex = new RegExp('^$|^(?=.{1,15}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    company_name: ReferenceField({
      label: 'Company Name',
      sheetKey: 'Vendor',
      foreignKey: 'companyName',
      relationship: 'has-many',
      description:
        'This is a reference to the company name of the record that must exist in your account prior to import.',
      required: true,
    }),

    subsidiary: ReferenceField({
      label: 'Subsidiary',
      sheetKey: 'Subsidiary_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      description:
        'This is a reference to the subsidiary of the record that match the selected subsidiary on the entity record.',
      required: true,
    }),

    currency: ReferenceField({
      label: 'Currency',
      sheetKey: 'Currency_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      description:
        'This is a reference to a currency that must exist in your account prior to import. The currency used must match the currency selected on the customer’s record.',
      required: true,
    }),

    exchangeRate: NumberField({
      label: 'Exchange Rate',
      description:
        'Enter the currency exchange rate as of cutover date for the transaction.  Ask your lead consultant for details.',
      default: 1,
      annotations: {
        default: true,
        defaultMessage: 'Exchange Rate was not provided, it has been set to ',
        compute: true,
        computeMessage:
          'This value was automatically reformatted to eight decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(8))
      },
    }),

    postingPeriod: TextField({
      label: 'Posting Period',
      description:
        'This is the cutover period.  Formula driven. Do not override.',
      default: 'Aug 2021',
      annotations: {
        default: true,
        defaultMessage: 'Posting Period was automatically set.',
      },
    }),

    tranDate: SmartDateField({
      label: 'Tran Date',
      description: 'Enter the original invoice date.',
      required: true,
      formatString: 'yyyy-MM-dd',
    }),

    dueDate: SmartDateField({
      label: 'Due Date',
      description: 'Enter the due date of the invoice.',
      formatString: 'yyyy-MM-dd',
    }),

    referenceno: TextField({
      label: 'Reference No',
      description: 'Enter PO/reference number.',
    }),

    memo: TextField({
      label: 'Memo',
      description:
        'You can retain the default memo driven by the formula or enter the actual description of the invoice. ',
      validate: (value) => {
        const regex = new RegExp('^$|^(?=.{1,999}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    itemLine_Item: TextField({
      label: 'Item Line Item',
      description:
        'This is the dummy item to be used in importing the open transactions.  Formula driven. Do not override.',
    }),

    itemLine_description: TextField({
      label: 'Item Line Description',
      description:
        'You can retain the default memo driven by the formula or enter the actual description of the invoice. ',
      validate: (value) => {
        const regex = new RegExp('^$|^(?=.{1,999}$).*', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    itemLine_Quantity: NumberField({
      label: 'Item Line Quantity',
      description: 'Enter item Quantity',
      required: true,
    }),

    itemLine_Rate: NumberField({
      label: 'Item Line Rate',
      description: 'Enter the rate for the item (price per quantity).',
      required: true,
    }),

    Transaction_Amount: NumberField({
      label: 'Transaction Amount',
      description:
        'This is the column is calculated by multiplying the rate to the quantity.  Formula driven do not override.',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      //compute: (v: number) => {return Number(v.toFixed(2))},
    }),

    Base_Currency_Amount: NumberField({
      label: 'Base Currency Amount',
      description:
        'This is the column is calculated by multiplying the Transaction Amount to the Exchange Rate to calculate the amount that is going to be posted to the general ledger.  Formula driven. Do not override.',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      //compute: (v: number) => {return Number(v.toFixed(2))},
    }),

    itemLine_department: TextField({
      label: 'Item Line Department',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),

    itemLine_class: TextField({
      label: 'Item Line Class',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),

    itemLine_location: TextField({
      label: 'Item Line Location',
      description:
        'This should be the #N/A value of the segment.  Formula driven. Do not override.',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/

      //await due_date_to_yyyy_mm_dd({ recordBatch, session, logger })
      //await transaction_date_to_yyyy_mm_dd({ recordBatch, session, logger })
      await set_transaction_amount_base_currency_amount({
        recordBatch,
        session,
        logger,
      })
      /** end running migrated hooks **/
    },
  }
)
