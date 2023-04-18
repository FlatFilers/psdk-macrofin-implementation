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

export const Status_NetSuite_Extract = new Sheet(
  'Status (NetSuite Extract)',
  {
    internalID: TextField({
      label: 'Internal ID',
      unique: true,
    }),

    name: TextField({
      label: 'Name ID',
      unique: true,
    }),
  },
  {
    readonly: true,
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
