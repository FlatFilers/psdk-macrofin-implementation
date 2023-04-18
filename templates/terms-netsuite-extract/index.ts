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

export const Terms_NetSuite_Extract = new Sheet(
  'Terms (NetSuite Extract)',
  {
    description: TextField({
      label: 'Description',
      required: true,
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
