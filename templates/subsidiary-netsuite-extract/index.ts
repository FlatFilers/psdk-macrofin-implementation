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
  ReferenceField,
} from '@flatfile/configure'

export const Subsidiary_NetSuite_Extract = new Sheet(
  'Subsidiary (NetSuite Extract)',
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

    currency: ReferenceField({
      label: 'Currency',
      sheetKey: 'Currency_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
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
    readonly: true,
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/

      await { recordBatch, session, logger }
      /** end running migrated hooks **/
    },
  }
)
