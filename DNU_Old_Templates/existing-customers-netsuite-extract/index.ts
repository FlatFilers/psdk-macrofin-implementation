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

export const Existing_Customers_NetSuite_Extract = new Sheet(
  'Existing Customers (NetSuite Extract)',
  {
    internalID: TextField({
      label: 'Internal ID',
      unique: true,
    }),

    name: TextField({
      label: 'Name',
      unique: true,
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
