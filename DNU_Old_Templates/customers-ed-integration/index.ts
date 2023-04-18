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

import { Status_NetSuite_Extract } from '../status-netsuite-extract'
import { Subsidiary_NetSuite_Extract_No_References } from '../subsidiary-netsuite-extract-no-references'
import { Sales_Rep_NetSuite_Extract } from '../sales-rep-netsuite-extract'
import { Customer_Category_NetSuite_Extract } from '../customer-category-netsuite-extract'
import { States_NetSuite_Extract } from '../states-netsuite-extract'
import { Countries_NetSuite_Extract } from '../countries-netsuite-extract'
import { Chart_Of_Accounts_NetSuite_Extract_No_References } from '../chart-of-accounts-netsuite-extract-no-references'
import { Payment_Term_NetSuite_Extract } from '../payment-term-netsuite-extract'

export const Customers_Ed_Integration = new Sheet(
  'Customers (Ed Integration)',
  {
    externalId: TextField({
      label: 'ExternalID',
      description:
        'This is the Unique backend Identifier for a Customer Record. Should be Unique for all the Customer Records. This can be used to create a Parent-Child Relationship and to link other record sets with these Customers.',
      unique: true,
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,100}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    entityId: TextField({
      label: 'Customer ID',
      description:
        'This is the Front-End Customer ID. It will be combined with the Company or Invididual Name to create the full Entity ID.   ID should be unique for all  Customers. This field is not required if you use Auto-Generated Numbers.',
      required: true,
      unique: true,
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,80$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    isperson: BooleanField({
      label: 'Individual',
      description:
        'Records TRUE/FALSE. Please put TRUE if the Customer is an individual.',
    }),

    salutation: OptionField({
      label: 'Mr./Ms...',
      description:
        '(Need category mappings) Optional field if the Customer is an Individual. Leave blank for Companies.',
      options: {
        '1': 'Mr.',
        '2': 'Ms.',
        '3': 'Mrs.',
        '4': 'PhD',
        '5': 'JD',
        '6': 'Esq',
        '7': 'Rev',
      },
    }),

    firstname: TextField({
      label: 'First Name',
      description:
        '(need requiredWith logic) Required field if the Customer is an Individual. ',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,32}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    middlename: TextField({
      label: 'Middle Name',
      description:
        'Optional field if the Customer is an Individual.  Leave blank for Companies.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,32}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    lastname: TextField({
      label: 'Last Name',
      description:
        '(Need requiredWith logic) Required field if the Customer is an Individual. Leave blank for Companies.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,32}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    title: TextField({
      label: 'Job Title',
      description: 'For individual customers, leave blank for Companies.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,99}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    companyname: TextField({
      label: 'Company Name',
      description:
        '(Need requiredWith logic) Required field if the Customer is a Company. Leave blank for Individual customers',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,83}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    parent: TextField({
      label: 'Child Of',
      description:
        '(Need Lookup/Relational logic) ParentHandle field is used to create the Parent-Child Relationship for the Customers.  You can use parent Customer ID/Name or External ID. Please make sure to populate the template such that the Parent Records are given in rows above the Child records.',
    }),

    status: LinkedField({
      label: 'Status',
      description:
        'This field should have the reference to Customer statuses that must exist in your account prior to importing.  You can create a new Customer status at Setup > Sales > Customer Statuses > New.',
      required: true,
      sheet: Status_NetSuite_Extract,
    }),

    subsidiary: LinkedField({
      label: 'Subsidiary',
      description:
        '(array mapped to multiple FKs) This is a reference to the subsidiary which must be created in your account prior to import.    In case you want to refer a child subsidiary the complete hierarchy must be provided in the format: Parent Subsidiary Name : Child Subsidiary Name.  The delimiter to be used for selecting multiple subsidiaries is a pipe ( | ), without spaces between the two subsidiary references.  This field becomes mandatory if you are using a NetSuite One-World account.',
      required: true,
      sheet: Subsidiary_NetSuite_Extract_No_References,
    }),

    salesrep: LinkedField({
      label: 'Sales Rep',
      description:
        '(Lookup field) Provide the reference to the Sales Rep associated with this Customer. The Employee record must exist in your account prior to importing.   The Sales Rep checkbox must be marked in Lists > Employees > Human Resources.',
      sheet: Sales_Rep_NetSuite_Extract,
    }),

    url: TextField({
      label: 'Web Address',
      description:
        'Must be the complete URL of the company. Ex. http://www.netsuite.com',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,100}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    category: LinkedField({
      label: 'Category',
      description:
        'Provide the Category reference for this Customer.   It must exist in Setup > Accounting > Accounting Lists > New > Customer Category prior to importing.',
      sheet: Customer_Category_NetSuite_Extract,
    }),

    defaultorderpriority: NumberField({
      label: 'Default Order Priority',
      description:
        'Enter a number to designate the priority for this customer.  To utilize the priority-based item commitment functionality in your account, you must mark customer records to prioritize the importance of filling orders for customers. Then, transactions are processed based on the indicated priority of the selected customer.',
    }),

    comments: TextField({
      label: 'Comments',
      description:
        'These are the general Comments for the Customers. Should not be used to put the User Notes.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,4000}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    email: TextField({
      label: 'Email',
      description:
        'This field should contain the main E-mail Address of the Customer.  The Information entered for this field must conform to the standard e-mail Address format. i.e.user@domain.com',
    }),

    altEmail: TextField({
      label: 'Alt. Email',
      description:
        'This field is only available for Individual Customers.  This field should contain the alternate E-mail Address of the Customer.    The Information entered for this field must conform to the standard e-mail Address format. i.e. user@domain.com.',
    }),

    phone: TextField({
      label: 'Phone',
      description:
        'The Information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
    }),

    altPhone: TextField({
      label: 'Alt. Phone',
      description:
        'This field is only available for Individual Customers.  The Information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
    }),

    mobilePhone: TextField({
      label: 'Mobile Phone',
      description:
        'This field is only available for Individual Customers.  The Information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
    }),

    homePhone: TextField({
      label: 'Home Phone',
      description:
        'This field is only available for Individual Customers.  The Information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
    }),

    fax: TextField({
      label: 'Fax',
      description:
        'The Information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
    }),

    Address1_AddressName: TextField({
      label: 'Label',
      description:
        'This field is only required if you use the AddressList element. It maps to the Label of an Address and indicates the beginning of an individual Address.   The Label must be unique for all the different Addresses for this Customer.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,150$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    Address1_attention: TextField({
      label: 'Attention',
      description: 'Enter the name of the Individual in this field.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,83$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    Address1_Addressee: TextField({
      label: 'Addressee',
      description: 'Enter the Addressee or the Company Name here.',
      validate: (value) => {
        const regex = new RegExp('', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    Address1_phone: TextField({
      label: 'Phone',
      description: 'Enter a phone number for your Customer. ',
    }),

    Address1_line1: TextField({
      label: 'Address 1',
      description: 'Enter the Address Line 1 in this field.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,150$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    Address1_line2: TextField({
      label: 'Address 2',
      description: 'Enter the Address Line 2 in this field.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,150$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    Address1_city: TextField({
      label: 'Address1 City',
      description: 'Enter the City of the Address in this field.',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,50$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    Address1_state: LinkedField({
      label: 'Province/State',
      description:
        '(need Lookup field) Enter the State in this field. You may enter the standard abbreviation or the full state or province name.',
      sheet: States_NetSuite_Extract,
    }),

    Address1_zipCode: TextField({
      label: 'Postal Code/Zip',
      description: 'Enter the Zip Code of the Address in this field.',
    }),

    Address1_country: LinkedField({
      label: 'Country',
      description:
        '(need Lookup field) This is the Reference to the Country of this Address. It must match the List of the Countries in NetSuite.',
      required: true,
      sheet: Countries_NetSuite_Extract,
    }),

    Address1_defaultBilling: BooleanField({
      label: 'Default Billing',
      description:
        'If this Address is to be marked as a Default Billing Address, please put TRUE.   Otherwise, enter FALSE if this is NOT a Default Billing Address.',
    }),

    Address1_defaultShipping: BooleanField({
      label: 'Default Shipping',
      description:
        'If this Address is to be marked as a Default Shipping Address, please put TRUE.   Otherwise, enter FALSE if this is it NOT a Default Shipping Address.',
    }),

    accountnumber: NumberField({
      label: 'Account Number',
      description: 'Account Number shared with the Customer.',
    }),

    defaultreceivablesaccount: LinkedField({
      label: 'Default Receivables Account',
      description:
        "(need Lookup field) Choose the A/R account to use by default on receivables transactions for this customer.  If you select Use System Preference, the account selected at Setup > Accounting > Accounting Preferences > Items/Transactions in the Default Receivables Account field is used as this customer's default.",
      sheet: Chart_Of_Accounts_NetSuite_Extract_No_References,
    }),

    currency: OptionField({
      label: 'Currency',
      description:
        'This element is a reference to a currency record that must exist in  your account prior to importing.  The currency used must match the  currency selected on the customer’s record.',
      options: {
        USD: 'United States dollar',
        GBP: 'Pound sterling',
        EUR: 'Euro',
        CAD: 'Canadian dollar',
        AUD: 'Australian dollar',
        CHF: 'Swiss franc',
        CNY: 'Chinese yuan',
        AED: 'United Arab Emirates dirham',
        AFN: 'Afghan afghani',
        ALL: 'Albanian lek',
        AMD: 'Armenian dram',
        ANG: 'Netherlands Antillean guilder',
        AOA: 'Angolan kwanza',
        ARS: 'Argentine peso',
        AWG: 'Aruban florin',
        AZN: 'Azerbaijani manat',
        BAM: 'Bosnia and Herzegovina convertible mark',
        BBD: 'Barbados dollar',
        BDT: 'Bangladeshi taka',
        BGN: 'Bulgarian lev',
        BHD: 'Bahraini dinar',
        BIF: 'Burundian franc',
        BMD: 'Bermudian dollar',
        BND: 'Brunei dollar',
        BOB: 'Boliviano',
        BRL: 'Brazilian real',
        BSD: 'Bahamian dollar',
        BTN: 'Bhutanese ngultrum',
        BWP: 'Botswana pula',
        BYN: 'Belarusian ruble',
        BZD: 'Belize dollar',
        CDF: 'Congolese franc',
        CLP: 'Chilean peso',
        COP: 'Colombian peso',
        COU: 'Unidad de Valor Real',
        CRC: 'Costa Rican colon',
        CUC: 'Cuban convertible peso',
        CUP: 'Cuban peso',
        CVE: 'Cape Verdean escudo',
        CZK: 'Czech koruna',
        DJF: 'Djiboutian franc',
        DKK: 'Danish krone',
        DOP: 'Dominican peso',
        DZD: 'Algerian dinar',
        EGP: 'Egyptian pound',
        ERN: 'Eritrean nakfa',
        ETB: 'Ethiopian birr',
        FJD: 'Fiji dollar',
        FKP: 'Falkland Islands pound',
        GEL: 'Georgian lari',
        GHS: 'Ghanaian cedi',
        GIP: 'Gibraltar pound',
        GMD: 'Gambian dalasi',
        GNF: 'Guinean franc',
        GTQ: 'Guatemalan quetzal',
        GYD: 'Guyanese dollar',
        HKD: 'Hong Kong dollar',
        HNL: 'Honduran lempira',
        HRK: 'Croatian kuna',
        HTG: 'Haitian gourde',
        HUF: 'Hungarian forint',
        IDR: 'Indonesian rupiah',
        ILS: 'Israeli new shekel',
        INR: 'Indian rupee',
        IQD: 'Iraqi dinar',
        IRR: 'Iranian rial',
        ISK: 'Icelandic króna',
        JMD: 'Jamaican dollar',
        JOD: 'Jordanian dinar',
        JPY: 'Japanese yen',
        KES: 'Kenyan shilling',
        KGS: 'Kyrgyzstani som',
        KHR: 'Cambodian riel',
        KMF: 'Comoro franc',
        KPW: 'North Korean won',
        KRW: 'South Korean won',
        KWD: 'Kuwaiti dinar',
        KYD: 'Cayman Islands dollar',
        KZT: 'Kazakhstani tenge',
        LAK: 'Lao kip',
        LBP: 'Lebanese pound',
        LKR: 'Sri Lankan rupee',
        LRD: 'Liberian dollar',
        LSL: 'Lesotho loti',
        LYD: 'Libyan dinar',
        MAD: 'Moroccan dirham',
        MDL: 'Moldovan leu',
        MGA: 'Malagasy ariary',
        MKD: 'Macedonian denar',
        MMK: 'Myanmar kyat',
        MNT: 'Mongolian tögrög',
        MOP: 'Macanese pataca',
        MRU: 'Mauritanian ouguiya',
        MUR: 'Mauritian rupee',
        MVR: 'Maldivian rufiyaa',
        MWK: 'Malawian kwacha',
        MXN: 'Mexican peso',
        MYR: 'Malaysian ringgit',
        MZN: 'Mozambican metical',
        NAD: 'Namibian dollar',
        NGN: 'Nigerian naira',
        NIO: 'Nicaraguan córdoba',
        NOK: 'Norwegian krone',
        NPR: 'Nepalese rupee',
        NZD: 'New Zealand dollar',
        OMR: 'Omani rial',
        PAB: 'Panamanian balboa',
        PEN: 'Peruvian sol',
        PGK: 'Papua New Guinean kina',
        PHP: 'Philippine peso',
        PKR: 'Pakistani rupee',
        PLN: 'Polish złoty',
        PYG: 'Paraguayan guaraní',
        QAR: 'Qatari riyal',
        RON: 'Romanian leu',
        RSD: 'Serbian dinar',
        RUB: 'Russian ruble',
        RWF: 'Rwandan franc',
        SAR: 'Saudi riyal',
        SBD: 'Solomon Islands dollar',
        SCR: 'Seychelles rupee',
        SDG: 'Sudanese pound',
        SEK: 'Swedish krona',
        SGD: 'Singapore dollar',
        SHP: 'Saint Helena pound',
        SLL: 'Sierra Leonean leone',
        SOS: 'Somali shilling',
        SRD: 'Surinamese dollar',
        SSP: 'South Sudanese pound',
        STN: 'São Tomé and Príncipe dobra',
        SVC: 'Salvadoran colón',
        SYP: 'Syrian pound',
        SZL: 'Swazi lilangeni',
        THB: 'Thai baht',
        TJS: 'Tajikistani somoni',
        TMT: 'Turkmenistan manat',
        TND: 'Tunisian dinar',
        TOP: 'Tongan paʻanga',
        TRY: 'Turkish lira',
        TTD: 'Trinidad and Tobago dollar',
        TWD: 'New Taiwan dollar',
        TZS: 'Tanzanian shilling',
        UAH: 'Ukrainian hryvnia',
        UGX: 'Ugandan shilling',
        UYU: 'Uruguayan peso',
        UYW: 'Unidad previsional',
        UZS: 'Uzbekistan som',
        VED: 'Venezuelan bolívar digital',
        VES: 'Venezuelan bolívar soberano',
        VND: 'Vietnamese đồng',
        VUV: 'Vanuatu vatu',
        WST: 'Samoan tala',
        YER: 'Yemeni rial',
        ZAR: 'South African rand',
        ZMW: 'Zambian kwacha',
        ZWL: 'Zimbabwean dollar',
      },
    }),

    terms: LinkedField({
      label: 'Terms',
      description:
        '(need enum values) This field should have the  reference to default terms that you have with this Customer.   These records must exist in Setup > Accounting > Accounting Lists > Terms prior to importing.',
      sheet: Payment_Term_NetSuite_Extract,
    }),

    creditlimit: TextField({
      label: 'Credit Limit',
      description:
        'This is the Credit Limit you would want to set for the Sales transactions with this Customer.',
      validate: (value) => {
        const regex = new RegExp('^\\d*\\.?\\d+$', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    hold: OptionField({
      label: 'Hold',
      description:
        "Select one of the following:  Select Auto if you want this customer's credit status to follow the rules you set at > > Accounting Preferences. Select On to manually apply a credit hold on this customer. Select Off to manually remove a credit hold on this customer.",
      options: {
        auto: 'Auto',
        on: 'On',
        off: 'Off',
      },
    }),

    vatregnumber: NumberField({
      label: 'Tax Reg. Number',
      description: "Enter this Customer's tax registration number.",
    }),

    resaleNumber: NumberField({
      label: 'Resale Number',
      description:
        "If you do not collect Sales tax from this Customer because your merchandise will be resold, enter your Customer's appropriate tax license number here.",
    }),

    emailTransaction: BooleanField({
      label: 'Email Transaction',
      description:
        "Defaults to False - don't want customer to override the value",
    }),

    inactive: BooleanField({
      label: 'Inactive',
    }),

    DRAccount: TextField({
      label: 'DRAccount',
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
