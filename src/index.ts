import { Workbook, SpaceConfig } from '@flatfile/configure'
import { EventTopic } from '@flatfile/api'
import { ExcelExtractor } from '@flatfile/plugin-xlsx-extractor'

import { Open_AP_Template } from '../templates/open-ap-template'
import { Vendor } from '../templates/vendor'
import { Chart_of_Accounts_NetSuite_Extract } from '../templates/chart-of-accounts-netsuite-extract'
import { Open_AR_Template } from '../templates/open-ar-template'
import { Customers } from '../templates/customers'
import { Trial_Balance } from '../templates/trial-balance'
import { Subsidiary_NetSuite_Extract } from '../templates/subsidiary-netsuite-extract'
import { States_NetSuite_Extract } from '../templates/states-netsuite-extract'
import { Win_Project_Type_Values } from '../templates/win-project-type-values'
import { Industry_Values } from '../templates/industry-values'
import { Price_Level_NetSuite_Extract } from '../templates/price-level-netsuite-extract'
import { Tax_Item_NetSuite_Extract } from '../templates/tax-item-netsuite-extract'
import { Terms_NetSuite_Extract } from '../templates/terms-netsuite-extract'
import { Currency_NetSuite_Extract } from '../templates/currency-netsuite-extract'
import { Status_NetSuite_Extract } from '../templates/status-netsuite-extract'
import { Language_NetSuite_Extract } from '../templates/language-netsuite-extract'
import { Payment_Term_NetSuite_Extract } from '../templates/payment-term-netsuite-extract'
import { Customer_Category_NetSuite_Extract } from '../templates/customer-category-netsuite-extract'
import { Sales_Rep_NetSuite_Extract } from '../templates/sales-rep-netsuite-extract'
import { Vendor_Category_NetSuite_Extract } from '../templates/vendor-category-netsuite-extract'
import { Countries_NetSuite_Extract } from '../templates/countries-netsuite-extract'
import { Payment_File_Format_NetSuite_Extract } from '../templates/payment-file-format-netsuite-extract'
import { Employees } from '../templates/employees'
import { Sales_Order_Status } from '../templates/sales-order-status'
import { Location } from '../templates/location'
import { Department } from '../templates/department'
import { Classes } from '../templates/classes'
import { Vendor_Bank_Details } from '../templates/vendor-bank-details'
import { Billing_Schedule } from '../templates/billing_schedule'
import { Job } from '../templates/job'
import { Partners } from '../templates/partners'
import { Open_Amortization_Schedule } from '../templates/open_amortization_schedule'
import { Open_Sales_Order } from '../templates/open_sales_order'

const macrofinFullProject = new SpaceConfig({
  name: 'Macrofin Implementation',
  slug: 'MacrofinImplementation',
  workbookConfigs: {
    customers: new Workbook({
      name: 'Customers',
      slug: 'CustomersWorkbook',
      namespace: 'Customers',
      sheets: {
        //sheet to be populated in Space
        Customers,
        //Reference sheets for customers
        Status_NetSuite_Extract,
        Subsidiary_NetSuite_Extract,
        Employees,
        Customer_Category_NetSuite_Extract,
        States_NetSuite_Extract,
        Countries_NetSuite_Extract,
        Chart_of_Accounts_NetSuite_Extract,
        Currency_NetSuite_Extract,
        Terms_NetSuite_Extract,
        Win_Project_Type_Values,
        Industry_Values,
        //Reference sheets for employees
        Department,
        Classes,
        Location,
        Open_Sales_Order,
        //States_NetSuite_Extract
        //Countries_NetSuite_Extract,
        
      },
    }),
    vendors: new Workbook({
      name: 'Vendors',
      slug: 'VendorsWorkbook',
      namespace: 'Vendors',
      sheets: {
        //sheet to be populated in Space
        Vendor,
        //Reference sheets for vendors
        Subsidiary_NetSuite_Extract,
        Currency_NetSuite_Extract,
        Payment_Term_NetSuite_Extract,
        States_NetSuite_Extract,
        Countries_NetSuite_Extract,
        Vendor_Category_NetSuite_Extract,
        Chart_of_Accounts_NetSuite_Extract,
        Price_Level_NetSuite_Extract,
        Tax_Item_NetSuite_Extract,
      },
    }),
    open_ap: new Workbook({
      name: 'Open AP',
      slug: 'OpenAPWorkbook',
      namespace: 'Open AP',
      sheets: {
        //sheet to be populated in Space
        Open_AP_Template,
        //Reference sheets for OpenAP
        Vendor,
        Subsidiary_NetSuite_Extract,
        Currency_NetSuite_Extract,
        //Reference sheets for vendors
        Payment_Term_NetSuite_Extract,
        States_NetSuite_Extract,
        Countries_NetSuite_Extract,
        Vendor_Category_NetSuite_Extract,
        Chart_of_Accounts_NetSuite_Extract,
        Price_Level_NetSuite_Extract,
        Tax_Item_NetSuite_Extract,
        //Subsidiary_NetSuite_Extract,
        //Currency_NetSuite_Extract,
      },
    }),
    open_ar: new Workbook({
      name: 'Open AR',
      slug: 'OpenARWorkbook',
      namespace: 'Open AR',
      sheets: {
        //sheet to be populated in Space
        Open_AR_Template,
        //Reference sheets for Open AR
        Customers,
        Subsidiary_NetSuite_Extract,
        Currency_NetSuite_Extract,
        //Reference sheets for customers
        Status_NetSuite_Extract,
        Employees,
        Customer_Category_NetSuite_Extract,
        States_NetSuite_Extract,
        Countries_NetSuite_Extract,
        Chart_of_Accounts_NetSuite_Extract,
        Terms_NetSuite_Extract,
        //Currency_NetSuite_Extract,
        //Subsidiary_NetSuite_Extract,

        //Reference sheets for employees
        Department,
        Classes,
        Location,
      },
    }),
  },
})

//Excel Plug-in
macrofinFullProject.on([EventTopic.Uploadcompleted], (event) => {
  return new ExcelExtractor(event, { rawNumbers: true }).runExtraction()
})

export default macrofinFullProject
