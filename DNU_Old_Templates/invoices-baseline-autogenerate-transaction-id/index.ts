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

export const Invoices_BASELINE_Autogenerate_Transaction_ID = new Sheet(
  'Invoices BASELINE - Autogenerate Transaction ID',
  {
    externalId: TextField({
      label: 'ExternalID',
      description:
        'This is the Unique backend Identifier. Can be copied from the Invoice Number in the absence of any Unique backend identifier.',
      required: true,
      unique: true,
    }),

    tranId: TextField({
      label: 'Invoice #',
      description:
        'Enter Invoice number. This field should be unique. Not required if Auto-Generated number will be used',
    }),

    custbody_nsts_order_type: OptionField({
      label: 'Order Type',
      description:
        'Enter the type of order this invoice is. Options include: -New -Upsell -Renewal -Downsell',
      required: true,
      options: {
        new: 'New',
        upsell: 'Upsell',
        renewal: 'Renewal',
        downsell: 'Downsell',
      },
    }),

    entity: TextField({
      label: 'Customer',
      description:
        '(need Lookup field) This is a reference to a Customer record that must exist in your account prior to import. If the customer to be referred is a child customer, complete parent-child hierarchy will have to be provided in the format Parent CustomerID : Child CustomerID',
      required: true,
    }),

    terms: TextField({
      label: 'Terms',
      description:
        '(Need lookup field) This is a reference to a Term record that must exist in your account prior to import. Setup>Accounting>Accounting lists>New',
    }),

    salesRep: TextField({
      label: 'Sales Rep',
      description:
        '(need Lookup field) Provide the reference to the Sales Rep associated with this Customer. The Employee record must exist in your account prior to importing.   The Sales Rep checkbox must be marked in Lists > Employees > Human Resources.',
    }),

    memo: TextField({
      label: 'Memo',
      description: 'Enter the memo for this transaction. ',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,999}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    tranDate: TextField({
      label: 'Date',
      description:
        '(need Date type field with output format options) This is the date on which the Order was created. Date should be entered in the format that is supported by your account (Setup > Company > General Preferences).',
      required: true,
    }),

    postingPeriod: TextField({
      label: 'Posting Period',
      description:
        '(need to Lookup/reference the "OPEN" period) This element is a reference to a posting period that must exist in your account prior to importing. The accounting period to which the transaction is being posted to must be OPEN.',
      required: true,
    }),

    dueDate: TextField({
      label: 'Due Date',
      description:
        '(Need date type field with output options) Type or pick the due date for this invoice. If you do not assign a due date, this invoice will not appear on aging reports.',
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

    discountItem: TextField({
      label: 'Discount Item',
      description:
        '(need Lookup) You can select a discount for this invoice. NetSuite fills the Rate and Discount Total fields based on the discount you choose.  Leave this field blank if you do not want to apply a discount to this transaction.  To create new discount items, go to Lists > Accounting Items and click New. On the New Item page, click Discount.',
    }),

    discountRate: TextField({
      label: 'Discount Rate',
      description:
        'NetSuite enters the rate for the discount item you selected. You can change the discount rate for this cash refund.  Enter the discount as a dollar amount like 10.00, or as a percentage like 10%.',
    }),

    itemLine_Item: TextField({
      label: 'Item',
      description:
        '(need more information, Lookup?) Each Invoice will be entered as follows, referencing the “Opening Balance Item AR” on a single line Item and entering the complete transaction amount as the rate. No taxes should be calculated. As mentioned, if the true Item code is required, multiple line Items may be added for the “Opening Balance Item AR” with a custom field to display the true Item number.',
      required: true,
    }),

    itemLine_description: TextField({
      label: 'Description',
      description: 'Enter the Sales Description of the item',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,999}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    itemLine_Rate: TextField({
      label: 'Rate',
      description:
        '(need enum values) Each Invoice will be entered as follows, referencing the “Opening Balance Item AR” on a single line Item and entering the complete transaction amount as the rate. No taxes should be calculated. As mentioned, if the true Item code is required, multiple line Items may be added for the “Opening Balance Item AR” with a custom field to display the true Item number.',
      required: true,
    }),

    itemLine_quantity: NumberField({
      label: 'Quantity',
      description: 'Enter item Quantity',
      required: true,
    }),

    department: TextField({
      label: 'Department',
      description:
        '(Need Lookup field) Provide the reference to the Item Department in this field.  In order to reference a sub department provide the complete hierarchy in the format Parent Department : Child department.  This should be created in Setup > Company > Departments prior to import.',
    }),

    class: OptionField({
      label: 'Class',
      description:
        'Provide the reference to the Item class in this field.  In order to reference a sub class provide the complete hierarchy in the format: Parent Class : Child Class.  This should be created in Setup > Company > Classes prior to import.',
      options: {
        '1': '01-Consulting',
        '2': '02-Data Migration',
        '3': '03-Custom Development',
        '4': '04-System Integration',
        '5': '05-Training',
        '6': '06-Support',
        '7': '07-Administration',
        '8': 'Operations',
        '9': 'Support',
        '10': '08-Project Management',
        '11': '09-Hardware',
        '12': '10-Software',
        '13': '11-Consumables',
        '15': 'Class C',
        '16': 'Class D',
        '17': 'Class A',
        '18': 'Class B',
      },
    }),

    location: TextField({
      label: 'Location',
      description:
        '(Need enum field / Lookup) Provide the reference to the Item Location in this field. In order to reference a sub Location provide the complete hierarchy in the format Parent Location : Child Location.  This should be created in Setup > Company > Locations prior to import.',
    }),

    billAttention: TextField({
      label: 'Attention',
      description:
        'If this is not the same with the Default Bill-To Attention specified on the Customer record, enter a new Bill To Attention. Otherwise, leave blank',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,83}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    billAddressee: TextField({
      label: 'Addressee',
      description:
        'If this is not the same with the Default Bill-To address specified on the Customer record, enter a new Bill To address. Otherwise, leave blank',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,83}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    billAddr1: TextField({
      label: 'Address 1',
      description:
        'If this is not the same with the Default Bill-To Billing 1 specified on the Customer record, enter a new Bill To Billing 1. Otherwise, leave blank',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,150}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    billAddr2: TextField({
      label: 'Address 2',
      description:
        'If this is not the same with the Default Bill-To Billing 2 specified on the Customer record, enter a new Bill To Billing 2. Otherwise, leave blank',
      validate: (value) => {
        const regex = new RegExp('^(?=.{1,150}$).*', 'i')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    billCity: TextField({
      label: 'City',
      description:
        'If this is not the same with the Default Bill-To City specified on the Customer record, enter a new Bill To City. Otherwise, leave blank',
    }),

    billState: TextField({
      label: 'State/Province',
      description:
        'If this is not the same with the Default Bill-To State specified on the Customer record, enter a new Bill To State. Otherwise, leave blank',
    }),

    billZip: TextField({
      label: 'Zip',
      description:
        'If this is not the same with the Default Bill-To Zip specified on the Customer record, enter a new Bill To Zip Code. Otherwise, leave blank',
    }),

    billCountry: TextField({
      label: 'Country',
      description:
        '(need Lookup) If this is not the same with the Default Bill-To Country specified on the Customer record, enter a new Bill To Country. Otherwise, leave blank',
    }),

    billPhone: TextField({
      label: 'Phone',
      description:
        'If this is not the same with the Default Bill-To Phone specified on the Customer record, enter a new Bill To Phone. Otherwise, leave blank',
    }),

    account: TextField({
      label: 'Account',
      description:
        '(need Lookup) This element is a reference to  the AR account that must exist in your account and the balance has to be posted to. The complete hierarchy of the accounts should be provided if you want to refer to a child account. The expected format is "Child Account Number Parent Account Name : Child Account Name"',
      required: true,
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
