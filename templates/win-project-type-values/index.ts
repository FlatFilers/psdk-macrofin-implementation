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
  
  export const Win_Project_Type_Values = new Sheet(
    'Win Project Type Values',
    {
      internalID: TextField({
        label: 'Internal ID',
        unique: true,
      }),
  
      name: TextField({
        label: 'Project Type',
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
  