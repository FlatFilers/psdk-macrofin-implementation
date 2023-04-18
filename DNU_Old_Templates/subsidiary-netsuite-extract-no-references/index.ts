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

export const Subsidiary_NetSuite_Extract_No_References = new Sheet(
  'Subsidiary (NetSuite Extract - No References)',
  {
    Internal_Id: TextField({
      label: 'Internal Id',
      unique: true,
    }),

    External_Id: TextField({
      label: 'External Id',
    }),

    Name: TextField({
      label: 'Name',
      unique: true,
    }),

    currency: TextField({
      label: 'Currency',
    }),

    inactive: BooleanField({
      label: 'Inactive',
      required: true,
    }),

    IsElimination: BooleanField({
      label: 'Is Elimination',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/

      await { recordBatch, session, logger }
      /** end running migrated hooks **/
    },
  }
)
