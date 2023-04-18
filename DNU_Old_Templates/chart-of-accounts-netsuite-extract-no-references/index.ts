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

export const Chart_Of_Accounts_NetSuite_Extract_No_References = new Sheet(
  'Chart Of Accounts (NetSuite Extract - No References)',
  {
    InternalId: TextField({
      label: '﻿Internal Id',
    }),

    externalId: TextField({
      label: 'External Id',
      unique: true,
    }),

    acctNumber: TextField({
      label: 'Acct Number',
    }),

    acctName: TextField({
      label: 'Acct Name',
    }),

    parent: TextField({
      label: 'Parent',
    }),

    acctType: TextField({
      label: 'Acct Type',
    }),

    currency: TextField({
      label: 'Currency',
    }),

    subsidiary: TextField({
      label: 'Subsidiary',
    }),

    includeChildren: TextField({
      label: 'Include Children',
    }),

    isInactive: TextField({
      label: 'Is Inactive',
    }),

    summaryAccount: TextField({
      label: 'Summary Account',
    }),

    eliminationAccount: TextField({
      label: 'Elimination Account',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
