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
  
  export const Industry_Values = new Sheet(
    'Industry Values',
    {
      internalID: TextField({
        label: 'Internal ID',
        unique: true,
      }),
  
      name: TextField({
        label: 'Industry Name',
        unique: true,
      }),
    },
    {
      //readonly: true,
      batchRecordsCompute: async (recordBatch, session, logger) => {
        /** begin running migrated hooks **/
        /** end running migrated hooks **/
      },
    }
  )
  