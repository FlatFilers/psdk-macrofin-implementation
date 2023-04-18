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

export const Status_NetSuite_Extract_No_References = new Sheet(
  'Status (NetSuite Extract - No References)',
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
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
