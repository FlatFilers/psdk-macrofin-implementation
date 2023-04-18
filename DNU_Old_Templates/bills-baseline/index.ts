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

export const Bills_BASELINE = new Sheet(
  'Bills BASELINE',
  {
    externalId: TextField({
      label: 'External ID',
      description:
        'This is the Unique backend Identifier. Can be copied from the Reference Number in the absence of any Unique backend identifier.',
      required: true,
    }),

    tranId: TextField({
      label: 'Reference No.',
      description:
        'Enter a vendor bill expense number. Number should be unique',
      required: true,
      unique: true,
    }),

    vendor: TextField({
      label: 'Vendor',
      description:
        'This is a reference to a Vendor record that must exist in your account prior to import (Lists > Relationships > Vendors).',
      required: true,
    }),

    subsidiary: TextField({
      label: 'Subsidiary',
      description: 'Enter the subsidiary this vendor bill is associated to.',
      required: true,
    }),

    account: TextField({
      label: 'Account',
      description:
        'This is a reference to a Payable account that must exist in your account prior to import. The complete hierarchy of the accounts should be provided if you want to refer to a child account. The expected format is "Child Account Number Parent Account Name : Child Account Name"',
      required: true,
    }),

    currency: OptionField({
      label: 'Currency',
      description:
        'This is a reference to a Currency record that must exist in your account prior to import (Lists > Accounting > Currencies).  NOTE: This is mandatory if the Multi-Currency feature is enabled',
      required: true,
      options: {
        USD: 'US Dollar',
        GBP: 'British Pound',
        EUR: 'Euro',
        CAD: 'Canadian Dollar',
      },
    }),

    exchangeRate: TextField({
      label: 'Exchange Rate',
      description:
        'Enter the exchange rate applied in this transaction.  NOTE: If you are using Multiple currencies, this column becomes mandatory.',
      required: true,
    }),

    tranDate: TextField({
      label: 'Date',
      description:
        'Enter the Date the vendor bill was created. Date should be entered in the format that is supported by your account (Setup > Company > General Preferences).',
      required: true,
    }),

    postingPeriod: TextField({
      label: 'Posting Period',
      description:
        'This element is a reference to a posting period that must exist in your account prior to import. NOTE: The status of the accounting period on which this transaction will be posted should be OPEN.',
      required: true,
    }),

    dueDate: TextField({
      label: 'Due Date',
      description:
        "NetSuite inserts today's date. You can type or pick another date. If you do not assign a due date, this bill will not appear on aging reports.",
    }),

    memo: TextField({
      label: 'Memo',
      description: 'Enter vendor bill memo',
    }),

    purchaseItemLine_Item: TextField({
      label: 'Item',
      description:
        'This is a reference to an item that must exist in your account prior to import. ',
      required: true,
    }),

    purchaseItemLine_Quantity: TextField({
      label: 'Quantity',
      description: 'Enter the quantity of the item on this vendor bill.',
    }),

    purchaseItemLine_Description: TextField({
      label: 'Description',
      description: 'Enter the description of the item.',
    }),

    purchaseItemLine_Rate: TextField({
      label: 'Rate',
      description: 'Enter the description of the item.',
      required: true,
    }),

    purchaseItemLine_department: TextField({
      label: 'Department',
      description:
        'This is a reference to a Department record that must exist in your account prior to import. In order to reference a sub department provide the complete hierarchy in the format Parent Department : Child Department',
    }),

    purchaseItemLine_class: TextField({
      label: 'Class',
      description:
        'This is a reference to a Class record that must exist in your account prior to import. In order to reference a sub class provide the complete hierarchy in the format Parent Class : Child Class',
    }),

    purchaseItemLine_location: TextField({
      label: 'Location',
      description:
        'This is a reference to a Location record that must exist in your account prior to import. In order to reference a sub location provide the complete hierarchy in the format Parent Location : Child Location',
    }),

    purchaseExpenseLine_Category: TextField({
      label: 'Category',
      description:
        'This is a reference to an Expense Category that must exist in your account prior to import.',
    }),

    purchaseExpenseLine_account: TextField({
      label: 'Account',
      description:
        'This is a reference to an Expense account that must exist in your account prior to import. The complete hierarchy of the accounts should be provided if you want to refer to a child account. The expected format is "Child Account Number Parent Account Name : Child Account Name"',
      required: true,
    }),

    purchaseExpenseLine_amount: TextField({
      label: 'Amount',
      description: 'Enter vendor bill expense amount',
      required: true,
    }),

    purchaseExpenseLine_department: TextField({
      label: 'Expense Department',
      description:
        'This is a reference to a Department record that must exist in your account prior to import. In order to reference a sub department provide the complete hierarchy in the format Parent Department : Child Department',
    }),

    purchaseExpenseLine_class: TextField({
      label: 'Expense Class',
      description:
        'This is a reference to a Class record that must exist in your account prior to import. In order to reference a sub class provide the complete hierarchy in the format Parent Class : Child Class',
    }),

    purchaseExpenseLine_location: TextField({
      label: 'Expense Location',
      description:
        'This is a reference to a Location record that must exist in your account prior to import. In order to reference a sub location provide the complete hierarchy in the format Parent Location : Child Location',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
