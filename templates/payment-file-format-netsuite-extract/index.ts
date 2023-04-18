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

export const Payment_File_Format_NetSuite_Extract = new Sheet(
  'Payment File Format (NetSuite Extract)',
  {
    internalID: TextField({
      label: 'Internal ID',
      required: true,
      unique: true,
    }),

    name: TextField({
      label: 'Name',
      required: true,
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
