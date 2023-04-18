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

export const Tax_Item_NetSuite_Extract = new Sheet(
  'Tax Item (NetSuite Extract)',
  {
    internalID: TextField({
      label: 'Internal ID',
      unique: true,
    }),

    name: TextField({
      label: 'Name',
      unique: true,
    }),

    vatRate: TextField({
      label: 'VAT Rate',
    }),

    country: ReferenceField({
      label: 'Country',
      sheetKey: 'Countries_NetSuite_Extract',
      foreignKey: 'Countries',
      relationship: 'has-many',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
