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

export const Department = new Sheet(
  'Department',
  {
    //No Validation
    externalid: TextField({
      label: 'External ID',
      required: false,
      unique: true,
    }),

    //No Validation
    name: TextField({
      label: 'Name',
      required: true,
      unique: true,
    }),

    //Should Validate against a list of exsisting departments from a specific NetSuite environment
    parent: TextField({
      label: 'Parent',
      required: false,
      unique: false,
    }),

    //Should validate against Subsidary sheet
    subsidiary: ReferenceField({
      label: 'Subsidiary',
      sheetKey: 'Subsidiary_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      required: false,
      unique: false,
    }),

    //Checkbox
    includeChildren: BooleanField({
      label: 'Include Children',
      required: false,
      unique: false,
    }),

    //Checkbox
    isinactive: BooleanField({
      label: 'Is Inactive',
      required: false,
      unique: false,
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
