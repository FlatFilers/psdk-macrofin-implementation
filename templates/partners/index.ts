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

export const Partners = new Sheet(
  'Partners',
  {
    partnerName: NumberField({
      label: 'Partner Name',
      required: true,
      unique: true,
    }),

    partnerID: NumberField({
      label: 'Partner ID',
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
