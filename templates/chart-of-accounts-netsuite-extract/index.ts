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

export const Chart_of_Accounts_NetSuite_Extract = new Sheet(
  'Chart of Accounts (NetSuite Extract)',
  {
    internalID: TextField({
      label: 'Internal ID',
      unique: false,
    }),

    externalID: TextField({
      label: 'External ID',
      unique: true,
    }),

    'Account Number': TextField({
      label: 'Account Number',
      unique: false,
    }),

    'Account Name': TextField({
      label: 'Account Name',
      unique: false,
    }),
    //May need lookup to NetSuite
    parent: TextField({
      label: 'Parent',
      unique: false,
    }),

    'Account Type ': TextField({
      label: 'Account Type',
    }),

    currency: ReferenceField({
      label: 'Currency',
      sheetKey: 'Currency_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
    }),
    subsidiary: ReferenceField({
      label: 'Subsidiary',
      sheetKey: 'Subsidiary_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      description:
        'This is a reference to the subsidiary which must be created in your account prior to import. Select from the drop down field.',
      required: true,
    }),

    includeChildren: BooleanField({
      label: 'Include Children',
      unique: false,
    }),
    isInactive: BooleanField({
      label: 'Is Inactive?',
      unique: false,
    }),
    SummaryAccount: BooleanField({
      label: 'Summary Account',
      unique: false,
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
