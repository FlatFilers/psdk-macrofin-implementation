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

export const Sales_Order_Status = new Sheet(
  'Sales Order Status',
  {
    // Standard Values: Pending Fulfillment, Pending Approval, Pending Billing - these statuses will be managed by the consultant only. If any additional statuses are to be added they will be added by the consultant /integration

    statusName: TextField({
      label: 'Status Name',
      required: true,
      unique: true,
    }),
    id: TextField({
      label: 'id',
      required: false,
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
