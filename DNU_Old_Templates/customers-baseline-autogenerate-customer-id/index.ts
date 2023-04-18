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

export const Customers_BASELINE_Autogenerate_Customer_ID = new Sheet(
  'Customers BASELINE - Autogenerate Customer ID',
  {
    externalId: TextField({
      label: 'ExternalID',
      description:
        'This is the Unique backend Identifier for a Customer Record. Should be Unique for all the Customer Records. This can be used to create a Parent-Child Relationship and to link other record sets with these Customers.',
      required: true,
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
    }),

    isperson: BooleanField({
      label: 'Individual',
      description:
        'Records TRUE/FALSE. Please put TRUE if the Customer is an individual.',
      required: true,
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

    status: OptionField({
      label: 'Status',
      description:
        'This field should have the reference to Customer statuses that must exist in your account prior to importing.  You can create a new Customer status at Setup > Sales > Customer Statuses > New.',
      required: true,
      options: {
        '6': 'Unqualified',
        '7': 'Qualified',
        '8': 'In Discussion',
        '9': 'Identified Decision Makers',
        '10': 'Proposal',
        '11': 'In Negotiation',
        '12': 'Purchasing',
        '13': 'Closed Won',
        '14': 'Closed Lost',
        '15': 'Renewal',
        '16': 'Lost Customer',
      },
    }),

    subsidiary: TextField({
      label: 'Subsidiary',
      description:
        '(array mapped to multiple FKs) This is a reference to the subsidiary which must be created in your account prior to import.    In case you want to refer a child subsidiary the complete hierarchy must be provided in the format: Parent Subsidiary Name : Child Subsidiary Name.  The delimiter to be used for selecting multiple subsidiaries is a pipe ( | ), without spaces between the two subsidiary references.  This field becomes mandatory if you are using a NetSuite One-World account.',
    }),

    salesrep: TextField({
      label: 'Sales Rep',
      description:
        '(Lookup field) Provide the reference to the Sales Rep associated with this Customer. The Employee record must exist in your account prior to importing.   The Sales Rep checkbox must be marked in Lists > Employees > Human Resources.',
    }),

    partner: TextField({
      label: 'Partner',
      description:
        '(Lookup field) Provide the reference to the Partner associated with this Customer. The Partner record must exist in your account prior to importing.   When you select a partner on a customer record, that customer can only use promotion codes associated with that partner.',
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

    category: OptionField({
      label: 'Category',
      description:
        'Provide the Category reference for this Customer.   It must exist in Setup > Accounting > Accounting Lists > New > Customer Category prior to importing.',
      options: {
        '1': 'Base Price',
        '6': 'VIP Customer',
        '7': 'New Customer',
        '8': 'Online Price',
        '9': 'Wholesale',
        '10': 'Reseller',
      },
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

    Address1_state: OptionField({
      label: 'Province/State',
      description:
        '(need Lookup field) Enter the State in this field. You may enter the standard abbreviation or the full state or province name.',
      options: {
        AL: 'Alabama',
        AK: 'Alaska',
        AZ: 'Arizona',
        AR: 'Arkansas',
        AA: 'Armed Forces Americas',
        AE: 'Armed Forces Europe',
        AP: 'Armed Forces Pacific',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DE: 'Delaware',
        DC: 'District of Columbia',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        PR: 'Puerto Rico',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming',
      },
    }),

    Address1_zipCode: TextField({
      label: 'Postal Code/Zip',
      description: 'Enter the Zip Code of the Address in this field.',
    }),

    Address1_country: OptionField({
      label: 'Country',
      description:
        '(need Lookup field) This is the Reference to the Country of this Address. It must match the List of the Countries in NetSuite.',
      options: {
        Afghanistan: 'Afghanistan',
        'Aland Islands': 'Aland Islands',
        Albania: 'Albania',
        Algeria: 'Algeria',
        'American Samoa': 'American Samoa',
        Andorra: 'Andorra',
        Angola: 'Angola',
        Anguilla: 'Anguilla',
        Antarctica: 'Antarctica',
        'Antigua and Barbuda': 'Antigua and Barbuda',
        Argentina: 'Argentina',
        Armenia: 'Armenia',
        Aruba: 'Aruba',
        Australia: 'Australia',
        Austria: 'Austria',
        Azerbaijan: 'Azerbaijan',
        Bahamas: 'Bahamas',
        Bahrain: 'Bahrain',
        Bangladesh: 'Bangladesh',
        Barbados: 'Barbados',
        Belarus: 'Belarus',
        Belgium: 'Belgium',
        Belize: 'Belize',
        Benin: 'Benin',
        Bermuda: 'Bermuda',
        Bhutan: 'Bhutan',
        Bolivia: 'Bolivia',
        'Bonaire, Saint Eustatius and Saba':
          'Bonaire, Saint Eustatius and Saba',
        'Bosnia and Herzegovina': 'Bosnia and Herzegovina',
        Botswana: 'Botswana',
        'Bouvet Island': 'Bouvet Island',
        Brazil: 'Brazil',
        'British Indian Ocean Territory': 'British Indian Ocean Territory',
        'Brunei Darussalam': 'Brunei Darussalam',
        Bulgaria: 'Bulgaria',
        'Burkina Faso': 'Burkina Faso',
        Burundi: 'Burundi',
        Cambodia: 'Cambodia',
        Cameroon: 'Cameroon',
        Canada: 'Canada',
        'Canary Islands': 'Canary Islands',
        'Cape Verde': 'Cape Verde',
        'Cayman Islands': 'Cayman Islands',
        'Central African Republic': 'Central African Republic',
        'Ceuta and Melilla': 'Ceuta and Melilla',
        Chad: 'Chad',
        Chile: 'Chile',
        China: 'China',
        'Christmas Island': 'Christmas Island',
        'Cocos (Keeling) Islands': 'Cocos (Keeling) Islands',
        Colombia: 'Colombia',
        Comoros: 'Comoros',
        'Congo, Democratic Republic of': 'Congo, Democratic Republic of',
        'Congo, Republic of': 'Congo, Republic of',
        'Cook Islands': 'Cook Islands',
        'Costa Rica': 'Costa Rica',
        "Cote d'Ivoire": "Cote d'Ivoire",
        'Croatia/Hrvatska': 'Croatia/Hrvatska',
        Cuba: 'Cuba',
        Curaçao: 'Curaçao',
        Cyprus: 'Cyprus',
        'Czech Republic': 'Czech Republic',
        Denmark: 'Denmark',
        Djibouti: 'Djibouti',
        Dominica: 'Dominica',
        'Dominican Republic': 'Dominican Republic',
        'East Timor': 'East Timor',
        Ecuador: 'Ecuador',
        Egypt: 'Egypt',
        'El Salvador': 'El Salvador',
        'Equatorial Guinea': 'Equatorial Guinea',
        Eritrea: 'Eritrea',
        Estonia: 'Estonia',
        Ethiopia: 'Ethiopia',
        'Falkland Islands': 'Falkland Islands',
        'Faroe Islands': 'Faroe Islands',
        Fiji: 'Fiji',
        Finland: 'Finland',
        France: 'France',
        'French Guiana': 'French Guiana',
        'French Polynesia': 'French Polynesia',
        'French Southern Territories': 'French Southern Territories',
        Gabon: 'Gabon',
        Gambia: 'Gambia',
        Georgia: 'Georgia',
        Germany: 'Germany',
        Ghana: 'Ghana',
        Gibraltar: 'Gibraltar',
        Greece: 'Greece',
        Greenland: 'Greenland',
        Grenada: 'Grenada',
        Guadeloupe: 'Guadeloupe',
        Guam: 'Guam',
        Guatemala: 'Guatemala',
        Guernsey: 'Guernsey',
        Guinea: 'Guinea',
        'Guinea-Bissau': 'Guinea-Bissau',
        Guyana: 'Guyana',
        Haiti: 'Haiti',
        'Heard and McDonald Islands': 'Heard and McDonald Islands',
        'Holy See (City Vatican State)': 'Holy See (City Vatican State)',
        Honduras: 'Honduras',
        'Hong Kong': 'Hong Kong',
        Hungary: 'Hungary',
        Iceland: 'Iceland',
        India: 'India',
        Indonesia: 'Indonesia',
        'Iran (Islamic Republic of)': 'Iran (Islamic Republic of)',
        Iraq: 'Iraq',
        Ireland: 'Ireland',
        'Isle of Man': 'Isle of Man',
        Israel: 'Israel',
        Italy: 'Italy',
        Jamaica: 'Jamaica',
        Japan: 'Japan',
        Jersey: 'Jersey',
        Jordan: 'Jordan',
        Kazakhstan: 'Kazakhstan',
        Kenya: 'Kenya',
        Kiribati: 'Kiribati',
        "Korea, Democratic People's Republic":
          "Korea, Democratic People's Republic",
        'Korea, Republic of': 'Korea, Republic of',
        Kosovo: 'Kosovo',
        Kuwait: 'Kuwait',
        Kyrgyzstan: 'Kyrgyzstan',
        "Lao People's Democratic Republic": "Lao People's Democratic Republic",
        Latvia: 'Latvia',
        Lebanon: 'Lebanon',
        Lesotho: 'Lesotho',
        Liberia: 'Liberia',
        Libya: 'Libya',
        Liechtenstein: 'Liechtenstein',
        Lithuania: 'Lithuania',
        Luxembourg: 'Luxembourg',
        Macau: 'Macau',
        Macedonia: 'Macedonia',
        Madagascar: 'Madagascar',
        Malawi: 'Malawi',
        Malaysia: 'Malaysia',
        Maldives: 'Maldives',
        Mali: 'Mali',
        Malta: 'Malta',
        'Marshall Islands': 'Marshall Islands',
        Martinique: 'Martinique',
        Mauritania: 'Mauritania',
        Mauritius: 'Mauritius',
        Mayotte: 'Mayotte',
        Mexico: 'Mexico',
        'Micronesia, Federal State of': 'Micronesia, Federal State of',
        'Moldova, Republic of': 'Moldova, Republic of',
        Monaco: 'Monaco',
        Mongolia: 'Mongolia',
        Montenegro: 'Montenegro',
        Montserrat: 'Montserrat',
        Morocco: 'Morocco',
        Mozambique: 'Mozambique',
        'Myanmar (Burma)': 'Myanmar (Burma)',
        Namibia: 'Namibia',
        Nauru: 'Nauru',
        Nepal: 'Nepal',
        Netherlands: 'Netherlands',
        'Netherlands Antilles (Deprecated)':
          'Netherlands Antilles (Deprecated)',
        'New Caledonia': 'New Caledonia',
        'New Zealand': 'New Zealand',
        Nicaragua: 'Nicaragua',
        Niger: 'Niger',
        Nigeria: 'Nigeria',
        Niue: 'Niue',
        'Norfolk Island': 'Norfolk Island',
        'Northern Mariana Islands': 'Northern Mariana Islands',
        Norway: 'Norway',
        Oman: 'Oman',
        Pakistan: 'Pakistan',
        Palau: 'Palau',
        Panama: 'Panama',
        'Papua New Guinea': 'Papua New Guinea',
        Paraguay: 'Paraguay',
        Peru: 'Peru',
        Philippines: 'Philippines',
        'Pitcairn Island': 'Pitcairn Island',
        Poland: 'Poland',
        Portugal: 'Portugal',
        'Puerto Rico': 'Puerto Rico',
        Qatar: 'Qatar',
        'Reunion Island': 'Reunion Island',
        Romania: 'Romania',
        'Russian Federation': 'Russian Federation',
        Rwanda: 'Rwanda',
        'Saint Barthélemy': 'Saint Barthélemy',
        'Saint Helena': 'Saint Helena',
        'Saint Kitts and Nevis': 'Saint Kitts and Nevis',
        'Saint Lucia': 'Saint Lucia',
        'Saint Martin': 'Saint Martin',
        'Saint Vincent and the Grenadines': 'Saint Vincent and the Grenadines',
        Samoa: 'Samoa',
        'San Marino': 'San Marino',
        'Sao Tome and Principe': 'Sao Tome and Principe',
        'Saudi Arabia': 'Saudi Arabia',
        Senegal: 'Senegal',
        Serbia: 'Serbia',
        'Serbia and Montenegro (Deprecated)':
          'Serbia and Montenegro (Deprecated)',
        Seychelles: 'Seychelles',
        'Sierra Leone': 'Sierra Leone',
        Singapore: 'Singapore',
        'Sint Maarten': 'Sint Maarten',
        'Slovak Republic': 'Slovak Republic',
        Slovenia: 'Slovenia',
        'Solomon Islands': 'Solomon Islands',
        Somalia: 'Somalia',
        'South Africa': 'South Africa',
        'South Georgia': 'South Georgia',
        'South Sudan': 'South Sudan',
        Spain: 'Spain',
        'Sri Lanka': 'Sri Lanka',
        'St. Pierre and Miquelon': 'St. Pierre and Miquelon',
        'State of Palestine': 'State of Palestine',
        Sudan: 'Sudan',
        Suriname: 'Suriname',
        'Svalbard and Jan Mayen Islands': 'Svalbard and Jan Mayen Islands',
        Swaziland: 'Swaziland',
        Sweden: 'Sweden',
        Switzerland: 'Switzerland',
        'Syrian Arab Republic': 'Syrian Arab Republic',
        Taiwan: 'Taiwan',
        Tajikistan: 'Tajikistan',
        Tanzania: 'Tanzania',
        Thailand: 'Thailand',
        Togo: 'Togo',
        Tokelau: 'Tokelau',
        Tonga: 'Tonga',
        'Trinidad and Tobago': 'Trinidad and Tobago',
        Tunisia: 'Tunisia',
        Turkey: 'Turkey',
        Turkmenistan: 'Turkmenistan',
        'Turks and Caicos Islands': 'Turks and Caicos Islands',
        Tuvalu: 'Tuvalu',
        Uganda: 'Uganda',
        Ukraine: 'Ukraine',
        'United Arab Emirates': 'United Arab Emirates',
        'United Kingdom': 'United Kingdom',
        'United States': 'United States',
        Uruguay: 'Uruguay',
        'US Minor Outlying Islands': 'US Minor Outlying Islands',
        Uzbekistan: 'Uzbekistan',
        Vanuatu: 'Vanuatu',
        Venezuela: 'Venezuela',
        Vietnam: 'Vietnam',
        'Virgin Islands (British)': 'Virgin Islands (British)',
        'Virgin Islands (USA)': 'Virgin Islands (USA)',
        'Wallis and Futuna': 'Wallis and Futuna',
        'Western Sahara': 'Western Sahara',
        Yemen: 'Yemen',
        Zambia: 'Zambia',
        Zimbabwe: 'Zimbabwe',
      },
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

    defaultreceivablesaccount: TextField({
      label: 'Default Receivables Account',
      description:
        "(need Lookup field) Choose the A/R account to use by default on receivables transactions for this customer.  If you select Use System Preference, the account selected at Setup > Accounting > Accounting Preferences > Items/Transactions in the Default Receivables Account field is used as this customer's default.",
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

    terms: TextField({
      label: 'Terms',
      description:
        '(need enum values) This field should have the  reference to default terms that you have with this Customer.   These records must exist in Setup > Accounting > Accounting Lists > Terms prior to importing.',
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

    language: OptionField({
      label: 'Language',
      description:
        "Select this customer's preferred language.  This determines the language used on printed transaction forms.  In order to provide translated item names and descriptions, an administrator must select this language at Setup > Company > > Languages.",
      options: {
        English: 'English',
        Latin: 'Latin',
        Polish: 'Polish',
        Russian: 'Russian',
        Romanian: 'Romanian',
        Finnish: 'Finnish',
        Swedish: 'Swedish',
        Norwegian: 'Norwegian',
        Portuguese: 'Portuguese',
        Czech: 'Czech',
        Turkish: 'Turkish',
        Dutch: 'Dutch',
        Hungarian: 'Hungarian',
        Spanish: 'Spanish',
        Greek: 'Greek',
        German: 'German',
        French: 'French',
        Italian: 'Italian',
        'Chinese - Mandarin': 'Chinese - Mandarin',
        Thai: 'Thai',
        Japanese: 'Japanese',
        Korean: 'Korean',
        Vietnamese: 'Vietnamese',
        Malay: 'Malay',
        Arabic: 'Arabic',
        Dari: 'Dari',
        Tagalog: 'Tagalog',
        Hindi: 'Hindi',
        Afrikaans: 'Afrikaans',
        Albanian: 'Albanian',
        Azerbaijani: 'Azerbaijani',
        Armenian: 'Armenian',
        Amharic: 'Amharic',
        Burmese: 'Burmese',
        Bulgarian: 'Bulgarian',
        Bosnian: 'Bosnian',
        Bengali: 'Bengali',
        Belarusian: 'Belarusian',
        Basque: 'Basque',
        Croatian: 'Croatian',
        Catalan: 'Catalan',
        Georgian: 'Georgian',
        Estonian: 'Estonian',
        Danish: 'Danish',
        Hebrew: 'Hebrew',
        Hausa: 'Hausa',
        Haitian: 'Haitian',
        Gujarati: 'Gujarati',
        Lao: 'Lao',
        Kyrgyz: 'Kyrgyz',
        Khmer: 'Khmer',
        Kazakh: 'Kazakh',
        Kannada: 'Kannada',
        Icelandic: 'Icelandic',
        Irish: 'Irish',
        Indonesian: 'Indonesian',
        Macedonian: 'Macedonian',
        Latvian: 'Latvian',
        Lithuanian: 'Lithuanian',
        Persian: 'Persian',
        Nepali: 'Nepali',
        Mongolian: 'Mongolian',
        Marathi: 'Marathi',
        Malayalam: 'Malayalam',
        Quechua: 'Quechua',
        Punjabi: 'Punjabi',
        Pashto: 'Pashto',
        Swahili: 'Swahili',
        Somali: 'Somali',
        Slovene: 'Slovene',
        Slovak: 'Slovak',
        Sinhala: 'Sinhala',
        Serbian: 'Serbian',
        Sindhi: 'Sindhi',
        Turkmen: 'Turkmen',
        Tibetan: 'Tibetan',
        Tajik: 'Tajik',
        Telugu: 'Telugu',
        Tamil: 'Tamil',
        Yoruba: 'Yoruba',
        Uzbek: 'Uzbek',
        Urdu: 'Urdu',
        Ukrainian: 'Ukrainian',
        Uighur: 'Uighur',
        Zulu: 'Zulu',
        'Chinese - Cantonese': 'Chinese - Cantonese',
      },
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)
