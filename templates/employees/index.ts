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
import { SmartDateField } from '../../src/SmartDateField'

export const Employees = new Sheet(
  'Employees',
  {
    externalid: TextField({
      label: 'External ID',
      description:
        'This is the Unique backend Identifier for an Employee Record. Should be unique for all Entity Records. This can be used to link other record sets with this Employee.',
      required: true,
      unique: true,
      validate: (value) => {
        const regex = new RegExp('^.{0,100}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 100 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    entityId: TextField({
      label: 'Entity ID',
      description:
        'Can be left blank if you use auto-numbering for Employee IDs.  We recommend not using the auto-numbering for employees. Instead use the original Employee ID if any or Concatenate the First Name and Last Name values.',
      required: true,
      unique: true,
      validate: (value) => {
        const regex = new RegExp('^.{0,83}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 83 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    //Do we need a default value here? - We don't need one but if one is required then it will be "FALSE"

    isInactive: BooleanField({
      label: 'Is Inactive',
      description: 'Enter TRUE here if this account is inactive.',
    }),

    firstName: TextField({
      label: 'First Name',
      description: 'Enter the First Name of the Employee.',
      required: true,
      validate: (value) => {
        const regex = new RegExp('^.{0,32}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 32 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    middleName: TextField({
      label: 'Middle Name',
      description: 'Enter the Middle Name of the Employee.',
      validate: (value) => {
        const regex = new RegExp('^.{0,32}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 32 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    lastName: TextField({
      label: 'Last Name',
      description: 'Enter the Last Name of the Employee.',
      required: true,
      validate: (value) => {
        const regex = new RegExp('^.{0,32}$', '')
        if (!regex.test(value)) {
          return [new Message('Invalid value', 'error', 'validate')]
        }
      },
    }),

    //Need to Add Email Validation! - The email formatting should following the following criteria - Recipient name + @ symbol + Domain name + Top-level domain

    email: TextField({
      label: 'Email',
      description:
        'This field should contain the main E-mail Address of the Employee. The information entered for this field must conform to the standard e-mail Address format. i.e. user@domain.com',
      validate: (value) => {
        const regex = new RegExp('^$|^[w-.]+@([w-]+.)+[w-]{2,4}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'The information entered for this field must conform to the standard e-mail Address format. i.e. user@domain.com.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    //No validation but Maximum Value of 21

    phone: TextField({
      label: 'Phone',
      description:
        'The information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
      validate: (value) => {
        const regex = new RegExp('^.{0,21}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 21 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    //No validation but Maximum Value of 21

    officephone: TextField({
      label: 'Office Phone',
      description:
        'The information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
      validate: (value) => {
        const regex = new RegExp('^.{0,21}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 21 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    //No validation but Maximum Value of 21

    mobilephone: TextField({
      label: 'Mobile Phone',
      description:
        'The information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
      validate: (value) => {
        const regex = new RegExp('^.{0,21}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 21 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    //Should validate against subsidary List

    subsidiary: ReferenceField({
      label: 'Subsidiary',
      sheetKey: 'Subsidiary_NetSuite_Extract',
      foreignKey: 'Name',
      relationship: 'has-many',
      description:
        'This is a reference to the subsidiary which must be created in your account prior to import.    In case you want to refer a child subsidiary the complete hierarchy must be provided in the format: Parent Subsidiary Name : Child Subsidiary Name.  The delimiter to be used for selecting multiple subsidiaries is a pipe ( | ), without spaces between the two subsidiary references.  This field becomes mandatory if you are using a NetSuite One-World account.',
      required: true,
    }),

    //Should validate against the department list

    department: ReferenceField({
      label: 'Department',
      sheetKey: 'Department',
      foreignKey: 'name',
      relationship: 'has-many',
      description:
        'A reference to a department that must exist in Setup > Company > Department prior to import.',
    }),

    //Should validate against the class list

    class: ReferenceField({
      label: 'Class',
      sheetKey: 'Classes',
      foreignKey: 'name',
      relationship: 'has-many',
      description:
        'A reference to a class that must exist in Setup > Company > Classes prior to import.',
    }),

    //Should validate against the location list

    location: ReferenceField({
      label: 'Location',
      sheetKey: 'Location',
      foreignKey: 'name',
      relationship: 'has-many',
      description:
        'A reference to a location that must exist in Setup > Company > Locations prior to import.',
    }),

    //Should source from employee type list - Need more information here!

    employeetype: TextField({
      label: 'Employee Type',
      description:
        'This is the reference to the Employee Type.   The Employee Type list should be created in NetSuite prior to import.  To review or add employee type definitions, go to Setup > Accounting > Employee Related Lists > Employee Type.',
    }),

    title: TextField({
      label: 'Job Title',
      description: "Enter the employee's official job title here.",
      validate: (value) => {
        const regex = new RegExp('^.{0,100}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 100 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    jobdescription: TextField({
      label: 'Job Description',
      validate: (value) => {
        const regex = new RegExp('^.{0,999}$', '')
        if (!regex.test(value)) {
          return [
            new Message(
              'Please enter up to 999 characters.',
              'error',
              'validate'
            ),
          ]
        }
      },
    }),

    //Should source from employee status list - need more information here
    employeestatus: TextField({
      label: 'Employee Status',
      description:
        'Enter the employee status.  This must be created in Setup > Accounting > Employee Related Lists > Employee Status.',
    }),

    //Should source against this employees list in NetSuite
    supervisor: TextField({
      label: 'Supervisor',
      description:
        "Select the name of your employee's supervisor.  This person approves expense reports and purchase requests.  If the employee doesn't have a supervisor, use the Approver field to select the person who approves this employee's expense reports and purchase requests.",
    }),

    issalesrep: BooleanField({
      label: 'Sales Rep',
      description: 'Put TRUE to mark this Employee as a Sales Rep',
    }),

    hiredate: SmartDateField({
      label: 'Hire Date',
      formatString: 'dd/MM/yyyy',
      locale: 'fr',
      description:
        'Date should be entered in the format that is supported by your account.   The date preference can be set by navigating to Setup > Company > General Preferences.',
    }),

    lastreviewdate: SmartDateField({
      label: 'Last Review Date',
      formatString: 'dd/MM/yyyy',
      locale: 'fr',
      description:
        'Enter the Last Review date for this Employee. Date should be entered in the format that is supported by your account.   The date preference can be set by navigating to Setup > Company > General Preferences.',
    }),

    nextreviewdate: SmartDateField({
      label: 'Next Review Date',
      formatString: 'dd/MM/yyyy',
      locale: 'fr',
      description:
        'Enter the Next Review date for this Employee. Date should be entered in the format that is supported by your account.   The date preference can be set by navigating to Setup > Company > General Preferences.',
    }),

    releasedate: SmartDateField({
      label: 'Release Date',
      formatString: 'dd/MM/yyyy',
      locale: 'fr',
      description: "Enter this person's last date of employment.",
    }),

    //Numerical upto 2 decimal points no comma seprators
    expenselimit: NumberField({
      label: 'Expense Limit',
      description:
        'Enter the amount this employee can expense without approval from a supervisor or approver.',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),

    //Should source against this employees list
    approver: TextField({
      label: 'Approver',
      description:
        "Enter the person that approves the employee's expense reports. If no approver is selected, the employee's supervisor approves expense reports.   If an expense approver is selected, the supervisor is no longer part of the approval hierarchy. ",
    }),

    //Numerical upto 2 decimal points
    approvallimit: NumberField({
      label: 'Expense Approval Limit',
      description:
        'Enter the maximum amount this employee is allowed to approve on an expense report when specified as an approver for another employee.  Expenses that exceed this amount must be approved by another supervisor or approver with a sufficient approval limit.',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),

    //Numerical upto 2 decimal points
    purchaseorderlimit: NumberField({
      label: 'Purchase Order Limit',
      description:
        'In the Purchase Limit field, enter the amount this employee can purchase without approval from a supervisor or approver. ',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),

    //Should source against this employees list

    purchaseorderapprover: TextField({
      label: 'Purchase Approver',
      description:
        "Enter the person that approves the employee's purchase requests. If no approver is selected, the supervisor approves purchase requests. In order to associate a approver record with this employee, please make sure to create the template such that the approver record is given at the row above. Use the ExternalID of the approver in this field.",
    }),

    //Numerical upto 2 decimal points
    purchaseorderapprovallimit: NumberField({
      label: 'Purchase Approver Limit',
      description:
        'Enter the maximum amount an employee is allowed to approve on a purchase request when specified as an approver for an employee.',
      annotations: {
        compute: true,
        computeMessage:
          'This value was automatically reformatted to two decimal places. Original value was: ',
      },
      compute: (v: number) => {
        return Number(v.toFixed(2))
      },
    }),

    //No validation

    address1_addressName: TextField({
      label: 'Address 1 - Address Name',
    }),

    //No validation

    address1_attention: TextField({
      label: 'Address 1 - Attention',
    }),

    //No validation

    address1_addressee: TextField({
      label: 'Address 1 - Addressee',
    }),

    //No validation

    address1_phone: TextField({
      label: 'Address 1 - Phone',
    }),

    //No validation

    address1_line1: TextField({
      label: 'Address 1 - Address Line 1',
    }),

    //No validation

    address1_line2: TextField({
      label: 'Address1 - Address Line 2',
    }),

    //No validation

    address1_city: TextField({
      label: 'Address 1 - City',
    }),

    //can we validate the states against the countries
    address1_state: ReferenceField({
      label: 'Address 1 - State',
      sheetKey: 'States_NetSuite_Extract',
      foreignKey: 'State',
      relationship: 'has-many',
      description:
        'Enter the State in this field. You may enter the standard abbreviation or the full state or province name.',
    }),

    address1_zipCode: TextField({
      label: 'Address 1 - Zip Code',
      description: 'Enter the Zip Code of the Address in this field.',
    }),

    //Validate against country list in NetSuite
    address1_country: ReferenceField({
      label: 'Address 1 - Country',
      sheetKey: 'Countries_NetSuite_Extract',
      foreignKey: 'Countries',
      relationship: 'has-many',
      description:
        'This is the Reference to the Country of this Address. It must match the List of the Countries in NetSuite',
    }),

    address1_defaultBilling: BooleanField({
      label: 'Address 1 - Default Billing',
      description:
        'If this Address is to be marked as a Default Billing Address, please put TRUE. Otherwise, enter FALSE',
    }),

    address1_defaultShipping: BooleanField({
      label: 'Address 1 - Default Shipping',
      description:
        'If this Address is to be marked as a Default Shipping Address, please put TRUE. Otherwise, enter FALSE',
    }),

    //No validation

    address2_addressName: TextField({
      label: 'Address 2 - Address Name',
    }),

    //No validation

    address2_attention: TextField({
      label: 'Address 2 - Attention',
    }),

    //No validation

    address2_addressee: TextField({
      label: 'Address 2 - Addressee',
    }),

    //No validation

    address2_phone: TextField({
      label: 'Address 2 - Phone',
    }),

    //No validation

    address2_line1: TextField({
      label: 'Address 2 - Address Line 1',
    }),

    //No validation

    address2_line2: TextField({
      label: 'Address2 - Address Line 2',
    }),

    //No validation

    address2_city: TextField({
      label: 'Address 2 - City',
    }),

    //can we validate the states against the countries
    address2_state: ReferenceField({
      label: 'Address 2 - State',
      sheetKey: 'States_NetSuite_Extract',
      foreignKey: 'State',
      relationship: 'has-many',
      description:
        'Enter the State in this field. You may enter the standard abbreviation or the full state or province name.',
    }),

    address2_zipCode: TextField({
      label: 'Address 2 - Zip Code',
      description: 'Enter the Zip Code of the Address in this field.',
    }),

    //Validate against country list in NetSuite
    address2_country: ReferenceField({
      label: 'Address 2 - Country',
      sheetKey: 'Countries_NetSuite_Extract',
      foreignKey: 'Countries',
      relationship: 'has-many',
      description:
        'This is the Reference to the Country of this Address. It must match the List of the Countries in NetSuite',
    }),

    address2_defaultBilling: BooleanField({
      label: 'Address 2 - Default Billing',
      description:
        'If this Address is to be marked as a Default Billing Address, please put TRUE. Otherwise, enter FALSE',
    }),

    address2_defaultShipping: BooleanField({
      label: 'Address 2 - Default Shipping',
      description:
        'If this Address is to be marked as a Default Shipping Address, please put TRUE. Otherwise, enter FALSE',
    }),

    //Should source against this employees list

    timeapprover: TextField({
      label: 'Time Approver',
      description:
        "In the Time Approver field, select the person that approves the employee's time transactions. If no time approver is selected, the employee's supervisor approves time entries.    If both a supervisor and a time approver are selected, either can approve time entries.",
    }),
  },
  {
    batchRecordsCompute: async (recordBatch, session, logger) => {
      /** begin running migrated hooks **/
      /** end running migrated hooks **/
    },
  }
)

//Old Fields

// salutation: TextField({
//   label: 'Salutation',
//   description: 'Enter the Salutation for the Employee.',
//   validate: (value) => {
//     const regex = new RegExp('^.{0,15}$', '')
//     if (!regex.test(value)) {
//       return [new Message('Invalid value', 'error', 'validate')]
//     }
//   },
// }),

// initials: TextField({
//   label: 'Initials',
//   description: 'Enter the Initials for the Employee',
//   validate: (value) => {
//     const regex = new RegExp('^.{0,3}$', '')
//     if (!regex.test(value)) {
//       return [new Message('Invalid value', 'error', 'validate')]
//     }
//   },
// }),

// homephone: NumberField({
//   label: 'Home Phone',
//   description:
//     'The information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
// }),

// fax: NumberField({
//   label: 'Fax',
//   description:
//     'The information entered for this field can be in one of the following formats: 999-999-9999 (999) 999-9999 1-999-999-9999 1 (999) 999-9999 999-999-9999 ext 999 +44 (0) 1234-4567-568',
// }),

// comments: TextField({
//   label: 'Comments',
//   description:
//     'These are the General Comments for the Employee.   NOTE: This field is not the "User Notes" field appearing on the Communication subtab.',
//   validate: (value) => {
//     const regex = new RegExp('^.{0,4000}$', '')
//     if (!regex.test(value)) {
//       return [new Message('Invalid value', 'error', 'validate')]
//     }
//   },
// }),

// image: OptionField({
//   label: 'Image',
//   description:
//     'This is a Reference to the Image of the Employee.  Image should be present in the File cabinet prior to importing',
//   options: {
//     'Temp Val': 'Temp Val',
//   },
// }),

// issupportrep: BooleanField({
//   label: 'Support Rep',
//   description: 'Put TRUE to mark this Employee as a Support Rep',
// }),

// socialSecurityNumber: TextField({
//   label: 'Social Security',
// }),

// birthdate: TextField({
//   label: 'Birth Date',
//   description:
//     'Enter the Birth date of the Employee. Date should be entered in the format that is supported by your account.   The date preference can be set by navigating to Setup > Company > General Preferences.',
// }),

// accountNumber: TextField({
//   label: 'Account',
//   description:
//     'If you, your payroll service, or other benefits provider assigns account numbers to your employees, enter that account number here.  This field is required for the Online Bill Pay feature.',
// }),

// emergencycontactname: TextField({
//   label: 'Emergency Contact - Name',
//   description:
//     "Enter the name for this employee's emergency contact.  NOTE: you can enter more than 1 emergency contact by adding additional columns to this file",
// }),

// emergencycontactrelationship: TextField({
//   label: 'Emergency Contact - Relationship',
//   description:
//     'Enter the relationship of the emergency contact to your employee here.  NOTE: you can enter more than 1 emergency contact by adding additional columns to this file',
// }),

// emergencycontactaddress: TextField({
//   label: 'Emergency Contact - Address',
//   description:
//     'Enter the address for the emergency contact here.  NOTE: you can enter more than 1 emergency contact by adding additional columns to this file',
// }),

// emergencycontactphone: TextField({
//   label: 'Emergency Contact - Phone',
//   description:
//     'Enter the phone number for the emergency contact here.  NOTE: you can enter more than 1 emergency contact by adding additional columns to this file',
// }),

// levelofeducation: TextField({
//   label: 'Level of Education',
//   description:
//     'Enter the level of education achieved by your employee.  NOTE: you can enter more than 1 education by adding additional columns to this file',
// }),

// degree: TextField({
//   label: 'Degree',
//   description:
//     'Enter the degree achieved by your employee here.  NOTE: you can enter more than 1 education by adding additional columns to this file',
// }),

// dateconferred: TextField({
//   label: 'Date Conferred',
//   description:
//     'Enter the date this degree was achieved by your employee.   NOTE: you can enter more than 1 education by adding additional columns to this file',
// }),

// netaccount: BooleanField({
//   label: 'Net Account',
//   description:
//     'Enter TRUE here to indicate that this account for deposit of the net paycheck balance remaining after amounts have been deposited into savings accounts.',
// }),

// savingsaccount: BooleanField({
//   label: 'Savings Account',
//   description: 'Enter TRUE here if this is a savings account.',
// }),

// prenoted: BooleanField({
//   label: 'Prenoted',
//   description:
//     'Enter FALSE here to runa prenote test transmission on the account. Enter TRUE to process direct deposit transactions to this account without a prenote test.',
// }),

// bankname: TextField({
//   label: 'Bank Name',
//   description: "Enter the name of the employee's bank here.",
// }),

// routingnumber: NumberField({
//   label: 'Routing Number',
//   description:
//     "Enter the 9-digit routing number for the employee's bank account",
// }),

// accountnumber: NumberField({
//   label: 'Account Number',
//   description: "Enter the employee's bank account number",
// }),

// amount: NumberField({
//   label: 'Amount',
//   description:
//     'Enter the amount of the payment to be deposited to this bank account. If you marked the Net Account box TRUE, you can leave this field blank.',
// }),

// giveaccess: BooleanField({
//   label: 'Give Access',
//   description:
//     'Enter TRUE to give your employee Access to NetSuite. Then, assign a role to Customize the level of Access. You can assign multiple roles.',
// }),

// role: TextField({
//   label: 'Role',
//   description: 'Enter the employee role.',
// }),

// sendemail: BooleanField({
//   label: 'Send Notification E-mail',
//   description:
//     'Enter TRUE to send an automatic e-mail notifying this employee of Access privileges to NetSuite.  For security, the email message will not disclose the password. You have to contact your employee with this information.',
// }),

// password: TextField({
//   label: 'Confirm Password',
//   description: 'Confirm the password you set here.',
// }),

// password2: TextField({
//   label: 'Confirm Password',
//   description: 'Confirm the password you set here.',
// }),

// requirepwdchange: TextField({
//   label: 'Require Password Change on Next Login',
//   description:
//     'Check this box to require this user to change their password on their next login to NetSuite.  When the user next logs in, they see the Change Password page and cannot access other NetSuite pages until a new password is created and saved.  Requiring this action protects your account from unauthorized access using generic passwords and prepares your account for an audit.  Note that the Require Password Change on Next Login box never displays as checked. When you check this box and save the record, an internal flag is set. When the password change occurs, the flag is cleared. If you later check the box again and resave the record, the internal flag is reset to require another password change.',
// }),
