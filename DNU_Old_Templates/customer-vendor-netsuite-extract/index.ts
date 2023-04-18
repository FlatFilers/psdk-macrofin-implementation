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

export const Customer_Vendor_NetSuite_Extract = new Sheet(
  'Customer / Vendor (NetSuite Extract)',
  {
    Internal_Id: TextField({
      label: 'Internal Id',
      unique: true,
    }),

    Entity_Id: TextField({
      label: 'Entity Id',
      unique: true,
    }),

    Company_Name: TextField({
      label: 'Company Name',
      unique: true,
    }),

    //May need reference here

    currency: TextField({
      label: 'Currency',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
