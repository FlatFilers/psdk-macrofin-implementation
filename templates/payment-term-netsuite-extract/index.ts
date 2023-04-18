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

export const Payment_Term_NetSuite_Extract = new Sheet(
  'Payment Term (NetSuite Extract)',
  {
    internalId: TextField({
      label: 'Internal Id',
      unique: true,
    }),

    name: TextField({
      label: 'Name',
      unique: true,
    }),

    daysUntilNetDue: NumberField({
      label: 'Days Until Net Due',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
