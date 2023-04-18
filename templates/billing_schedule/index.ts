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

export const Billing_Schedule = new Sheet(
  'Billing Schedule',
  {
    id: NumberField({
      label: 'ID',
      required: true,
      unique: true,
    }),

    billingScheduleName: TextField({
      label: 'Billing Schedule Name',
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
