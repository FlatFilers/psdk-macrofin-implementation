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

export const States_NetSuite_Extract = new Sheet(
  'States (NetSuite Extract)',
  {
    State: TextField({
      label: 'State',
      unique: true,
    }),

    'abbrev.': TextField({
      label: 'State Abbreviation',
    }),

    Country: TextField({
      label: 'Country',
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
